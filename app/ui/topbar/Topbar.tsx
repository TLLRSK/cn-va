"use client";

import { usePathname } from "next/navigation";
import TopbarMain from "./TopbarMain";
import TopbarShop from "./TopbarShop";

export default function TopbarResolver() {
  const pathname = usePathname();

  const isShopRoute =
    pathname.startsWith("/shop") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/thank-you");

  return isShopRoute ? <TopbarShop /> : <TopbarMain />;
}