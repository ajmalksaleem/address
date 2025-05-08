import  {Schema, model} from 'mongoose'

const ProductSchema = new Schema({
    image : String,
    title : String,
    description : String,
    category : String,
    brand : String,
    price : Number,
    salePrice : Number,
    totalStock : Number,
    averageRating : Number
},{timestamps: true})

const Product = new model('product', ProductSchema)

export default Product ;