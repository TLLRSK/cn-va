import { Fragment } from "react";

const OrderItems = ({
  order,
  className = "",
}: {
  order: any;
  className?: string;
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-md">Order Items</h2>

      <ul className="flex flex-col gap-md">
        {order.items.map((item: any, i: number) => (
          <Fragment key={i}>
            <li key={i} className="flex items-start">
              {item.image && (
                <div className="w-2/6 md:w-[calc(33%-(var(--m-sm)))] bg-muted aspect-square flex items-center justify-center p-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-3/4 max-h-[80%] object-contain rounded-md"
                  />
                </div>
              )}

              <div className="flex-1 flex flex-col gap-md ml-sm">
                <h3 className="max-w-[80%] text-sm font-medium">
                  {item.name}
                </h3>
                <p className="text-sm font-regular">x{item.quantity}</p>
              </div>

              <p className="text-sm font-bold">
                {item.total} {order.currency}
              </p>
            </li>

            {/* {i < order.items.length - 1 && <Separator color="muted" />} */}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default OrderItems;
