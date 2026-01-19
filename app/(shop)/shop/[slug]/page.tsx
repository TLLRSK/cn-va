import { getSingleProduct } from "@/lib/actions";
import React from "react";
import SingleProduct from "@/app/ui/shop/singleProduct/SingleProduct";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const singleProductData = await getSingleProduct(slug);

  return <SingleProduct data={singleProductData} />;
};

export default SingleProductPage;
