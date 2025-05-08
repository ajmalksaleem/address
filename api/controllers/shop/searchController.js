import {errorHandler} from '../../utils/error.js'
import Product from '../../models/productModel.js'

export const searchProducts = async(req,res,next)=>{
    try {
            const{keyword} = req.params;
            if(!keyword) return next(errorHandler(400, 'keyword not found'))
                const regEx = new RegExp(keyword, 'i')
            const createSearchQuery = {
                $or : [
                    {title : regEx},
                    {description : regEx},
                    {category : regEx},
                    {brand : regEx},
                ]
            }
            const searchResults = await Product.find(createSearchQuery)
            res.status(200).json({
                data : searchResults,
                success : true
            })
    } catch (error) {
        next(error)
    }
}
