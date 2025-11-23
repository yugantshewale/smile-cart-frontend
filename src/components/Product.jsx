import { Typography } from "@bigbinary/neetoui";

const Product = () => (
  <div className="px-6 pb-6">
    <div>
      <Typography className="py-2" style="h1">
        Infinix INBOOK
      </Typography>
      <hr className="border-2 border-black" />
    </div>
    <div className="mt-6 flex gap-4">
      <div className="w-2/5">
        <img
          alt="Product"
          className="h-64 w-10/12"
          src="https://ik.imagekit.io/d9mvewbju/SmileCart/thumbnail_61_7PaLfb.jpg"
        />
      </div>
      <div className="w-3/5 space-y-4">
        <Typography style="body1">
          Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey - 1 Year Warranty.
        </Typography>
        <Typography style="body1">MRP: $395.97</Typography>
        <Typography style="body1" weight="semibold">
          Offer price: $374.43
        </Typography>
        <Typography className="text-green-600" style="body1" weight="semibold">
          6% off
        </Typography>
      </div>
    </div>
  </div>
);
export default Product;
