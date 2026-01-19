import Header from "@/app/ui/shop/thank-you/Header";
import ThankyouClient from "@/app/ui/shop/thank-you/ThankyouClient";
import Separator from "@/app/ui/global/Separator";
import LinkBackToShop from "@/app/ui/links/LinkBackToShop";
import OrderItems from "@/app/ui/shop/thank-you/OrderItems";
import OrderTotals from "@/app/ui/shop/thank-you/OrderTotals";
import OrderBilling from "@/app/ui/shop/thank-you/OrderBilling";
import OrderSummary from "@/app/ui/shop/thank-you/OrderSummary";
import { getOrderData } from "@/lib/actions";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ order_token?: string | undefined }>;
}) {
  const { order_token } = await searchParams;

  if (!order_token) {
    console.error("No order_token in searchParams");
    return (
      <>
        <div className="w-full h-screen bg-foreground flex flex-col justify-center px-sm md:px-md">
          <h1 className="text-3xl font-black text-inverse leading-[85%]">
            No order token found
          </h1>
          <p className="text-sm text-inverse font-regular mt-xs">
            Please check your confirmation email for the correct link.
          </p>
        </div>
        <div className="w-full md:col-span-12 flex my-3xl px-sm md:px-md">
          <LinkBackToShop />
        </div>
      </>
    );
  }
  
  const order = await getOrderData(order_token);

  if (!order) {
    console.error("Order is null or undefined");
    return (
      <>
        <div className="w-full h-screen bg-foreground flex flex-col justify-center px-sm md:px-md">
          <h1 className="text-3xl font-black text-inverse leading-[85%]">
            Order not found
          </h1>
          <p className="text-sm text-inverse font-regular mt-xs">
            This order link may have expired or is invalid.
            <br />
            Please check your confirmation email.
          </p>
        </div>

        <div className="w-full md:col-span-12 flex my-3xl px-sm md:px-md">
          <LinkBackToShop />
        </div>
      </>
    );
  }

  return (
    <ThankyouClient>
      <article className="md:grid md:grid-cols-12">
        <Header email={order.billing.email} />

        <div className="md:col-span-5 flex flex-col px-sm md:pt-3xl md:px-md pt-md pb-lg gap-md relative">
          <OrderSummary order={order} className="" />

          <Separator color="muted" className="" />

          <div className="flex flex-col gap-md">
            <OrderBilling order={order} className="" />

            <Separator color="muted" />

            <OrderItems order={order} className="" />

            <Separator color="muted" />

            <OrderTotals order={order} className="" />
          </div>
        </div>
      </article>

      <div className="w-full md:col-span-12 flex my-3xl px-sm md:px-md">
        <LinkBackToShop />
      </div>
    </ThankyouClient>
  );
}
