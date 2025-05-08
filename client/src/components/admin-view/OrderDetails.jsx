import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { Label } from "../ui/label"
import { Dialog, DialogContent } from "../ui/dialog"
import CommonForm from "../common/Form"
import { useState } from "react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { getAllOrders, updateOrderStatus } from "@/redux/admin/order-slice"
import { useToast } from "@/hooks/use-toast"


const OrderDetails = ({OrderDetails}) => {
    const [formData, setFormData] = useState({status : ''});
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { toast } = useToast();
    
    const handleUpdateStatus = (e)=>{
        e.preventDefault()
        const {status} = formData;
        dispatch(updateOrderStatus({orderId : OrderDetails?._id, orderStatus : status })).then(data=>{
          if(data?.payload.success){
            dispatch(getAllOrders())
            setFormData({status:''})
            setOpen(false)
            toast({
              title: data?.payload?.message,
              variant : 'success'
            });
          }
        })
    }

  return (
    <>
     <Button onClick={() => setOpen(true)}>View Details</Button>
     <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] sm:max-h-[500px] overflow-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{OrderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>date</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$ {OrderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{OrderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{OrderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 `}
              >
                {OrderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
            {OrderDetails?.cartItems && OrderDetails?.cartItems.length > 0
                ? OrderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span  className="w-1/2 truncate">Title: {item.title}</span>
                      <span  className="w-1/4 truncate">Quantity: {item.quantity}</span>
                      <span  className="w-1/4 truncate">Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{OrderDetails?.userId?.username}</span>
              <span>{OrderDetails?.addressInfo?.address}</span>
              <span>{OrderDetails?.addressInfo?.city}</span>
              <span>pincode : {OrderDetails?.addressInfo?.pincode}</span>
              <span>{OrderDetails?.addressInfo?.phoneno}</span>
              <span>{OrderDetails?.addressInfo?.landmark}</span>
            </div>
          </div>
        </div>

        <div>
        <CommonForm
         formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
        </div>
      </div>
    </DialogContent>
    </Dialog>
    </>
  )
}

export default OrderDetails