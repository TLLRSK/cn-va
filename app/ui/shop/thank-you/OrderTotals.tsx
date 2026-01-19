import Separator from "@/app/ui/global/Separator";

const OrderTotals = ({
  order,
  className = "",
}: {
  order: any;
  className?: string;
}) => {
  const orderSubtotal = order.items.reduce(
    (acc: number, item: any) => acc + parseInt(item.total),
    0
  );

  const orderShipping = parseInt(order.total) - orderSubtotal;

  return (
    <div className={className}>
      <div className="flex flex-col gap-sm">
        <p className="flex items-center justify-between text-sm font-medium text-accent">
          Subtotal{" "}
          <span className="font-regular">
            {orderSubtotal} {order.currency}
          </span>
        </p>

        <p className="flex items-center justify-between text-sm font-medium text-highlight">
          Shipping{" "}
          <span className="font-regular">
            {orderShipping} {order.currency}
          </span>
        </p>

        <Separator color="muted" />

        <p className="flex items-center justify-between text-sm font-bold text-secondary">
          Total{" "}
          <span>
            {order.total} {order.currency}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderTotals;
