import AddressMenu from "@/components/shopping view/AddressMenu";
import CheckoutCartItems from "@/components/shopping view/CheckoutCartItems";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAddress } from "@/redux/shop/address-slice";
import { fetchCart } from "@/redux/shop/cart-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiPaypalLine } from "react-icons/ri";
import { createNewOrder } from "@/redux/shop/order-slice";
import PaymentBanner from '../../assets/online-payment.svg'
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const CheckoutPage = () => {
  const [addressInfo, setaddressInfo] = useState(null);
  const [isPaymentStart, setisPaymentStart] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { addressData } = useSelector((state) => state.address);
  const {user} = useSelector((state)=>state.auth)
  const {approvalURL} = useSelector(state=>state.shopOrders)
  const dispatch =  useDispatch()
  const navigate = useNavigate()

useEffect(() => {
  dispatch(fetchCart({userId : user?._id}))
  dispatch(getAddress({userId : user?._id}))
}, []);

const subTotal = cartItems?.items?.reduce((total, item) => total + (item?.productId?.salePrice * item?.quantity), 0)
const shippingAmount = 40;

const handleInitiatePaypal = async()=>{
  setisPaymentStart(true)
    const orderData = {
      userId : user?._id,
            cartItems : cartItems?.items?.map((cart)=>({
              productId : cart?.productId._id,
              image : cart?.productId?.image,
              title : cart?.productId?.title,
              price : cart?.productId?.salePrice, 
              quantity : cart?.quantity
            }
            )),
            addressInfo,
            orderStatus : 'pending',
            paymentMethod : 'paypal',
            paymentStatus : 'pending',
            totalAmount : subTotal,
            orderDate : new Date(),
            orderUpdateDate : new Date(),
            paymentId : '',
            payerId : '',
            cartId : cartItems._id,
    }
    console.log(orderData)
  const data =  await dispatch(createNewOrder(orderData))
      if(data?.payload?.success){
          setisPaymentStart(false)
      }else{
        setisPaymentStart(false)
      }
}

const handleNavigate = ()=>{
    navigate('/shop/account')
}

if(approvalURL){
  window.location.href = approvalURL;
}

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={PaymentBanner}
          className="h-full  mx-auto object-cover  object-center"
        />
      </div>
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex flex-1 gap-3 flex-col my-2 px-2">
          <p className="text-xl mx-auto">Choose Address</p>
          {addressData.length > 0 ?
            addressData.map((addressItem, index) => (
              <AddressMenu key={index} addressItem={addressItem}  addressInfo={addressInfo} setaddressInfo={setaddressInfo} />
            )) : 
            <div className="flex flex-col items-center gap-4">
            <p className="text-lg">You haven't added any address. Add an address to continue</p>
            <Button variant="outline" onClick={ handleNavigate}> <Plus/>Add New Address</Button>
            </div>
          }
        </div>
        <div className="flex flex-1 flex-col gap-2 pt-3 px-8">
          <p className="text-xl mx-auto">Total items</p>
          {cartItems &&
            cartItems?.items?.length > 0 &&
            cartItems?.items.map((item, index) => (
              <CheckoutCartItems key={index} item={item} />
            ))}
          <div className="space-y-3 mt-4 mx-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$40</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>{subTotal+40}</span>
            </div>
          </div>
          <Button disabled={isPaymentStart || addressInfo===null} onClick={handleInitiatePaypal} className='mb-7 mt-4'><RiPaypalLine /> {isPaymentStart ? 'Payment Initiating' : 'Checkout with paypal' }</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
