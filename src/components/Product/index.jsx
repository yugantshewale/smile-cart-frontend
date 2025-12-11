import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader, PageNotFound } from "components/Commons";
import { Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  const fetchProduct = async () => {
    try {
      const product = await productsApi.show(slug);
      setProduct(product);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isError) return <PageNotFound />;

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography style="body1">{description}</Typography>
          <Typography style="body1">MRP: ${mrp}</Typography>
          <Typography style="body1" weight="semibold">
            Offer price: ${offerPrice}
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
    </>
  );
};
export default Product;
