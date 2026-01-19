import { currenciesMap } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  
  try {
    const body = await req.json();
  
    const { token } = body;
    
    if (!token) {
      console.error("Missing token in request");
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const wpOrigin = process.env.WP_CHECKOUT_ORIGIN;
    
    if (!wpOrigin) {
      console.error("WP_CHECKOUT_ORIGIN not configured");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const wpUrl = `${wpOrigin}/wp-json/cart-bridge/v1/order`;

    const response = await fetch(wpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "unknown" }));
      console.error("WordPress API error:", error);
      return NextResponse.json(error, { status: response.status });
    }

    const orderData = await response.json();

    const formatedOrder = {...orderData, currency: currenciesMap[orderData.currency]}
    
    return NextResponse.json(formatedOrder);

  } catch (error: any) {
    console.error("[get-order] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}