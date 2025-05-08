import { useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { useState } from "react"

const ShOrderDetails = ({orderDetail}) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false)
  return (
    <>
    <Button onClick={() => setOpen(true)}>View Details</Button>
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-[600px] sm:max-h-[500px] overflow-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetail?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label> {new Date(orderDetail?.orderDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetail?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetail?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetail?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${orderDetail?.orderStatus === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`}
              >
               {orderDetail?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
            {orderDetail?.cartItems && orderDetail?.cartItems.length > 0
                ? orderDetail?.cartItems.map((item) => (
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
            <div className="grid gap-0.5 ">
              <span>username : {user?.username}</span>
              <span>addressInfo : {orderDetail?.addressInfo?.address}</span>
              <span>city : {orderDetail?.addressInfo?.city}</span>
              <span>pincode : {orderDetail?.addressInfo?.pincode}</span>
              <span>phoneno : {orderDetail?.addressInfo?.phoneno}</span>
              <span>landmark : {orderDetail?.addressInfo?.landmark}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
    </Dialog>
    </>

  )
}

export default ShOrderDetails