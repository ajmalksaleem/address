import { Separator } from "@/components/ui/separator"

const CheckoutCartItems = ({ item }) => {
  return (
    <>
      <div className="flex items-center gap-2 ">
        {/* Product Image */}
        <img
          src={item?.productId?.image}
          alt={item?.productId?.title}
          className="w-16 h-16 object-cover rounded-md"
        />
        
        {/* Product Title */}
        <div className="flex-1">
          <h4 className="font-medium">{item?.productId?.title}</h4>
        </div>
        
        {/* Quantity and Price */}
        <div className="flex items-center gap-4 ">
          <span className="text-muted-foreground">x{item?.quantity}</span>
          <p className="w-20 text-right font-medium">
            ${(item?.productId?.salePrice * item?.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <Separator />
    </>
  )
}

export default CheckoutCartItems