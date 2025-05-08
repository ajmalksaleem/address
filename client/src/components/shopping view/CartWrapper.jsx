import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemsContent from "./CartItemsContent";
import emptyCart from "../../assets/add-to-cart.svg";

const CartWrapper = ({ cartItems, setshowCartModal }) => {
  const navigate = useNavigate();
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      {
        cartItems && cartItems?.items?.length > 0 ? 
        <>
<div className="mt-8 space-y-4">
        {cartItems && cartItems?.items?.length > 0
          ? cartItems.items.map((item) => <CartItemsContent item={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4 ">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            ${" "}
            {cartItems?.items?.reduce(
              (total, item) =>
                total + item?.productId?.salePrice * item?.quantity,
              0
            )}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setshowCartModal(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
        </>
        : <>
        <div className="flex flex-col w-full h-full justify-center items-center">
          <p className="text-center text-2xl">Cart is Empty</p>
        <img className="md:w-[350px]" src={emptyCart} />
        </div>
              
        </>
      }
      
    </SheetContent>
  );
};

export default CartWrapper;
