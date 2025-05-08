import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const storage = new multer.memoryStorage();

export const imageUploadUtil = async(file)=>{
      try {
        const result = await cloudinary.uploader.upload(file,{
            resource_type : 'auto'
        })
        return result ; 
      } catch (error) {
        console.log(error)
      }
}
export const Upload = multer({storage})

