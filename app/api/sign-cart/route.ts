import { NextResponse } from "next/server";
import crypto from "crypto";

type ItemIn = { id?: unknown; quantity?: unknown };
type NormalizedItem = { product_id: number; quantity: number };

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function normalizeBase(base: string | undefined) {
  if (!base) return "";
  return base.replace(/\/+$/, "");
}

const rateLimitStore = new Map<string, number[]>();
function isRateLimited(
  identifier: string,
  maxRequests = Number(process.env.RATE_LIMIT_MAX || 10),
  windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000)
) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const reqs = rateLimitStore.get(identifier) || [];
  const recent = reqs.filter((t) => t > windowStart);
  if (recent.length >= maxRequests) {
    return true;
  }
  recent.push(now);
  rateLimitStore.set(identifier, recent);
  return false;
}

async function parseJsonBody(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    throw new Error("Invalid JSON body");
  }
  return body;
}

function validateAndNormalizeItems(itemsRaw: unknown): NormalizedItem[] {
  if (!Array.isArray(itemsRaw) || itemsRaw.length === 0) {
    throw new Error("Cart empty or invalid");
  }

  const normalized: NormalizedItem[] = itemsRaw.map((it: ItemIn, idx) => {
    const id = Number((it && (it as any).id) ?? NaN);
    const quantity = Number((it && (it as any).quantity) ?? 1);

    if (!Number.isFinite(id) || id <= 0 || !Number.isInteger(id)) {
      throw new Error(`Invalid product id at index ${idx}`);
    }
    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(quantity) || quantity > 1000) {
      throw new Error(`Invalid quantity for product ${id} at index ${idx}`);
    }

    return { product_id: Math.trunc(id), quantity: Math.trunc(quantity) };
  });

  return normalized;
}

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await parseJsonBody(req);
    const itemsRaw = body.items;
    const normalizedItems = validateAndNormalizeItems(itemsRaw);

    const payloadJson = JSON.stringify({ items: normalizedItems });
    const payloadB64 = base64UrlEncode(payloadJson);
    const ts = Math.floor(Date.now() / 1000);

    const secret = process.env.CART_SHARED_SECRET;
    const wpOriginRaw = process.env.WP_CHECKOUT_ORIGIN;
    if (!secret) {
      console.error("[sign-cart] CART_SHARED_SECRET not defined in env");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
    if (!wpOriginRaw) {
      console.error("[sign-cart] WP_CHECKOUT_ORIGIN not defined in env");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${payloadB64}.${ts}`);
    const sig = hmac.digest("hex");

    const wpBase = normalizeBase(wpOriginRaw);

    const tokenEndpoint = `${wpBase}/wp-json/cart-bridge/v1/token`;

    let tokenRes: Response;
    try {
      tokenRes = await fetchWithTimeout(
        tokenEndpoint,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: payloadB64, ts, sig }),
        },
        Number(process.env.SIGN_CART_FETCH_TIMEOUT_MS || 5000)
      );
    } catch (err: any) {
      console.error("[sign-cart] WP fetch failed:", err?.message ?? err);
      return NextResponse.json({ error: "Checkout provider unreachable" }, { status: 502 });
    }

    let tokenData: any;
    try {
      tokenData = await tokenRes.json();
    } catch (err) {
      console.error("[sign-cart] invalid JSON from token endpoint", err);
      return NextResponse.json({ error: "Invalid response from checkout provider" }, { status: 502 });
    }

    if (!tokenRes.ok || !tokenData?.token) {
      console.error("[sign-cart] token endpoint error:", tokenRes.status, tokenData);
      return NextResponse.json({ error: "Failed to create checkout token" }, { status: 502 });
    }

    const checkoutPath = process.env.WP_CHECKOUT_PATH || "/en/checkout/";
    const url = `${wpBase.replace(/\/+$/, "")}${checkoutPath}?t=${encodeURIComponent(tokenData.token)}`;

    return NextResponse.json({ url });

  } catch (err: any) {
    console.error("[sign-cart] error:", err?.message ?? err);
    const message = err?.message ?? "unknown error";
    
    if (message.includes("Cart empty")) {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
