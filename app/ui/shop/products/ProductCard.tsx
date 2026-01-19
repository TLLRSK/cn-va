import { ProductData } from "@/types/types";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductData }) => {
  const {
    slug,
    name,
    price,
    featured_media,
    type,
    external_url,
    stock_status,
  } = product;
  
  return (
    <li className="ae shop__card flex flex-col overflow-hidden relative">
      <Link
        href={type === "external" ? external_url : `shop/${slug}`}
        target={type === "external" ? "_blank" : "_top"}
        className="flex flex-col w-full relative"
      >
        <div className="w-full h-auto aspect-square bg-muted grid grid-cols-12 items-center group rounded-md">
          <img
            src={featured_media?.url || undefined}
            alt={featured_media?.alt}
            sizes={featured_media?.sizes.full}
            className="image--anim-card col-span-6 col-start-4 w-full object-cover will-change-transform xl:group-hover:scale-[.94] duration-700 transition-fading ease-in_out"
          />
        </div>

        <div className="flex flex-col items-start py-sm text-secondary">
          {stock_status !== "instock" ? (
            <>
              <h3 className={`text-sm font-medium text-highlight capitalize`}>
                {name}
              </h3>
              <p className={`text-sm font-medium uppercase text-highlight`}>
                Sold out
              </p>
            </>
          ) : (
            <>
              <h3 className={`text-sm font-medium`}>{name}</h3>
              <p className={`text-sm font-medium text-highlight`}>€{price}</p>
            </>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
