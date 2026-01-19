import Separator from "@/app/ui/global/Separator";
import Carousel from "./Carousel";
import Header from "./Header";
import FormAddProduct from "./FormAddProduct";
import AccordionList from "./AccordionList";
import { ProductData, SingleProductData } from "@/types/types";
import LinkBackToShop from "@/app/ui/links/LinkBackToShop";
import AccordionText from "./AccordionText";

const SingleProduct = ({ data }: { data: SingleProductData }) => {
  const {
    id,
    name,
    description,
    stock_status,
    images,
    price,
    attributes,
    stock_quantity,
  } = data;

  return (
    <>
      <article className="mt-3xl md:mt-0 md:pr-md md:p-0 md:grid md:grid-cols-12">
        <Carousel images={images} />

        <div className="md:min-h-screen h-fit flex flex-col md:col-span-5 2xl:col-span-4 mt-md md:mt-0 px-sm md:px-0 static md:sticky md:top-0 md:has-[input:checked]:static md:pt-2xl gap-md">
          <Header name={name} price={price} />

          <Separator color="muted" />

          <FormAddProduct
            product={{
              id,
              name,
              price: Number(price),
              image: images[0],
              stock_status,
              stock_quantity,
            }}
          />

          <div className="ae flex flex-col justify-end gap-sm pb-lg">
            <Separator color="muted" />
            <AccordionText label="Description" content={description} />
            <Separator color="muted" />
            <AccordionList label="Details" attributes={attributes} />
            <Separator color="muted" />
          </div>
        </div>
      </article>

      <div className="my-3xl px-sm md:px-md">
        <LinkBackToShop />
      </div>
    </>
  );
};

export default SingleProduct;
