import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { AddReview, fetchReviews } from "@/redux/shop/review-slice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [reviewMessage, setreviewMessage] = useState("");
  const [rating, setrating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { reviewList } = useSelector((state) => state.reviews);

  const handleAddToCart = async (productId) => {
    try {
      await dispatch(addToCart({ userId: user?._id, quantity: 1, productId }));
      toast({
        title: "Product is added to the cart",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Product adding failed",
        variant: "destructive",
      });
    }
  };

  const handleRatingChange = (star) => {
    setrating(star);
  };

  const handleAddReview = async () => {
    const data = await dispatch(
      AddReview({
        productId: productDetails?._id,
        userId: user?._id,
        message: reviewMessage,
        rating: rating,
      })
    );
    if (data?.payload?.success) {
      toast({
        title: "Product review added",
        variant: "success",
      });
      await dispatch(fetchReviews(productDetails._id));
    } else {
      toast({
        title: data?.payload?.error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(fetchReviews(productDetails?._id));
    }
  }, [productDetails]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setShowFullDescription(false);
      }}
    >
      <DialogContent className="grid sm:grid-cols-2 grid-cols-1 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw] max-h-[90vh] overflow-y-auto">
        {/* Image Section */}
        <div className="overflow-hidden rounded-lg relative">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="break-words">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p
              className={`text-muted-foreground  mt-3  ${
                !showFullDescription ? "line-clamp-3" : null
              }`}
            >
              {productDetails?.description}
              {showFullDescription &&
                productDetails?.description?.length > 20 && (
                  <span
                    className="text-blue-500 hover:underline text-xs mx-4"
                    onClick={() => setShowFullDescription(false)}
                  >
                    collapse
                  </span>
                )}
            </p>
            {!showFullDescription &&
              productDetails?.description?.length > 90 && (
                <span
                  onClick={() => setShowFullDescription(true)}
                  className="text-blue-500 hover:underline text-xs flex"
                >
                  View More
                </span>
              )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="flex items-center gap-2">
              <p
                className={`text-3xl font-bold ${
                  productDetails?.salePrice < productDetails?.price
                    ? "line-through text-muted-foreground"
                    : null
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice < productDetails?.price && (
                <span className="text-xs text-white bg-indigo-500  px-2">
                  {Math.round(
                    productDetails?.salePrice &&
                      ((productDetails?.price - productDetails?.salePrice) /
                        productDetails?.price) *
                        100
                  )}{" "}
                  % off
                </span>
              )}
            </span>
            {productDetails?.salePrice < productDetails?.price ? (
              <p className="text-2xl font-bold">${productDetails?.salePrice}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <div className="items-center flex gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary " />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span>(4.5)</span>
          </div>
          <div className="mt-7 ">
            <Button
              onClick={() => handleAddToCart(productDetails?._id)}
              className="w-full"
            >
              Add to Cart
            </Button>
          </div>
          <Separator className="mt-5" />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl mb-4 font-bold">Reviews</h2>
            {!reviewList?.some((reviewItem) =>
              reviewItem?.userId?._id === user?._id ) && (
                <div className="my-5 flex-col flex gap-3 px-1">
                  <Label>Write a review</Label>
                  <div className="flex gap-1">
                    <StarRating
                      rating={rating}
                      handleRatingChange={handleRatingChange}
                    />
                  </div>
                  <Input
                    name="reviewMessage"
                    placeholder="Write a review..."
                    value={reviewMessage}
                    onChange={(e) => setreviewMessage(e.target.value)}
                  />
                  <Button
                    onClick={handleAddReview}
                    disabled={reviewMessage.trim() === ""}
                  >
                    Submit
                  </Button>
                </div>
              )}
            {reviewList?.length > 0
              ? reviewList.map((reviewItem) => (
                  <div className="flex gap-3 mb-5">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{reviewItem?.userId?.username[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="gap-1 grid">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">
                          {reviewItem?.userId?.username}
                        </h3>
                      </div>
                      <div className="items-center flex gap-0.5">
                        <StarRating
                          rating={reviewItem?.rating}
                          mode={"comment"}
                          className="w-5 h-5 fill-primary "
                        />
                      </div>
                      <p className="">{reviewItem?.message}</p>
                    </div>
                  </div>
                ))
              : "No reviews"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
