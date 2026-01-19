const OrderSummary = ({
  order,
  className = "",
}: {
  order: any;
  className?: string;
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-md">Order Summary</h2>

      <div
        className={`flex flex-col gap-md ${className}`}
      >
        <div className={groupClasses}>
          <h3 className={headerClasses}>Order Number</h3>
          <p className={paragraphClasses}>#{order.order_number}</p>
        </div>

        <div className={groupClasses}>
          <h3 className={headerClasses}>Date Ordered</h3>
          <p className={paragraphClasses}>
            {new Date(order.date_created).toLocaleDateString()}
          </p>
        </div>

        <div className={groupClasses}>
          <h3 className={headerClasses}>Order Total</h3>
          <p className={paragraphClasses}>
            {order.total} {order.currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

const groupClasses = "flex flex-col gap-2";
const headerClasses = "text-xs text-accent font-medium";
const paragraphClasses = "text-sm font-regular leading-[95%]";
