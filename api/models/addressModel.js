import {Schema, model} from 'mongoose'

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      address : {
        type : String
      },
      city : {
        type : String
      },
      pincode : {
        type : Number
      },
      phoneno : {
        type : Number
      },
      landmark : {
        type : String
      }
},
{timestamps: true}
)

const Address = new model('address', addressSchema)

export default Address