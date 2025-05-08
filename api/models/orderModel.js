import  {Schema, model} from 'mongoose'

const OrderSchema = new Schema({
   userId : {
    type: Schema.Types.ObjectId,
    ref: "user",
   },
   cartId: {
    type: Schema.Types.ObjectId,
    ref: "cart",
   },
   cartItems: [
     {
       productId: String,
       title: String,
       image: String,
       price: String,
       quantity: Number,
     },
   ],
   addressInfo: {
     addressId: String,
     address: String,
     city: String,
     pincode: String,
     phoneno: Number,
     landmark: String,
   },
   orderStatus: String,
   paymentMethod: String,
   paymentStatus: String,
   totalAmount: Number,
   orderDate: Date,
   orderUpdateDate: Date,
   paymentId: String,
   payerId: String,
},{timestamps: true})

const Order = new model('order', OrderSchema)

export default Order ;