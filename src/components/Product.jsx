import { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import productsApi from "apis/products";
import { Spinner } from "neetoui";
import { append } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show();
      setProduct(response.data);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_urls: imageUrls,
    image_url: imageUrl,
  } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2" style="h1">
          {name}
        </Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <Carousel
            imageUrls={append(imageUrl, imageUrls)}
            title="Infinix Inbook"
          />
        </div>
        <div className="w-3/5 space-y-4">
          <Typography style="body1">{description}</Typography>
          <Typography style="body1">MRP: {mrp}</Typography>
          <Typography style="body1" weight="semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography
            className="text-green-600"
            style="body1"
            weight="semibold"
          >
            {discountPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default Product;
