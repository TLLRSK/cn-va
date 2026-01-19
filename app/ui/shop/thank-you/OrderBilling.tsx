const OrderBilling = ({
  order,
  className = "",
}: {
  order: any;
  className?: string;
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-md">Billing Info</h2>

      <div className="flex flex-col gap-4">
        <div className={containerClasses}>
          <h3 className={headerClasses}>Name</h3>
          <p className={paragraphClasses}>
            {order.billing.first_name} {order.billing.last_name}
          </p>
        </div>

        <div className={containerClasses}>
          <h3 className={headerClasses}>Address</h3>
          <p className={paragraphClasses}>
            {order.billing.address_1}
            <br />
            {order.billing.city}, {order.billing.postcode}
            <br />
            {order.billing.country}
          </p>
        </div>

        <div className={containerClasses}>
          <h3 className={headerClasses}>Email</h3>
          <p className={paragraphClasses}>{order.billing.email}</p>
        </div>

        {order.billing.phone && (
          <div className={containerClasses}>
            <h3 className={headerClasses}>Phone</h3>
            <p className={paragraphClasses}>{order.billing.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBilling;

const containerClasses = "grid grid-cols-6";
const headerClasses = "text-xs font-medium col-span-2";
const paragraphClasses = "text-sm font-regular text-accent col-span-4";
