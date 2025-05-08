import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCart, removeItem, UpdateCart } from '@/redux/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

const CartItemsContent = ({ item}) => {
const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
    const {toast} = useToast()

  const handleCartItemDelete  = async(item)=>{
    try {
     await dispatch(DeleteCart({userId : user?._id, productId : item?.productId?._id}))
     dispatch(removeItem(item?.productId?._id))
    } catch (error) {
      
    }
  }

  const handleUpdateCart = async(item, type)=>{
      try {
        if(type === 'plus'){
          await dispatch(UpdateCart({
            userId :  user?._id,
            productId : item?.productId?._id,
            quantity : item?.quantity + 1
          })).unwrap();
          
        }else if(type === 'minus'){
          await dispatch(UpdateCart({
            userId :  user?._id,
            productId : item?.productId?._id,
            quantity : item?.quantity - 1
          })).unwrap();
        }
      } catch (error) {
        toast({
          title : error,
          description : 'Product is out of stock, cant add further',
          variant: "destructive",
        })
      }
  }

  return (
    <>
      {item?.quantity > 0 && (
        <div className="flex items-center space-x-4">
          <img 
            src={item?.productId?.image} 
            alt={item?.productId?.title} 
            className="w-20 h-20 object-cover"
          />
          <div className="flex-1">
            <h3 className="font-extrabold">{item?.productId?.title}</h3>
            <div className="flex items-center mt-1 gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={()=>handleUpdateCart(item,'minus')}>
                <Minus className="w-4 h-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <span>{item?.quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full"  onClick={()=>handleUpdateCart(item,'plus')}>
                <Plus className="w-4 h-4" />
                <span className="sr-only">Increase</span> 
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-end">
        <p className="font-semibold"> $
          {(item?.productId?.salePrice * item.quantity).toFixed(2) }
        </p>
        <Trash className='cursor-pointer mt-1 ' size={20} onClick={()=>handleCartItemDelete(item)}/>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItemsContent;