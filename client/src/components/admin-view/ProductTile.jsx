import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({product, setFormData, setOpenCreateProducts, setEditId, setImageUrl, handleDelete}) => {
  return (
    <Card className=" max-w-sm w-[95%] mx-auto rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
    <div className="relative">
      {/* Image */}
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      
      {/* Out of Stock Overlay */}
      {product?.totalStock === 0  && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
          <span>Out of Stock</span>
        </div>
      )}
    </div>

    {/* Product Content */}
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold mb-2 truncate">{product?.title}</h2>

      <div className="flex justify-between items-center mb-3">
        <span className={`text-lg font-semibold text-gray-600 ${product?.salePrice > 0 ? "line-through" : ""}`}>
          ${product?.price}
        </span>
        {product?.salePrice > 0 && (
          <span className="text-lg font-bold">${product?.salePrice}</span>
        )}
      </div>

      <div className="text-sm text-gray-500">
        {product?.totalStock === 0 ? (
          <span className="text-red-600 font-semibold">Out of Stock</span>
        ) : (
          <span>{product?.totalStock} in stock</span>
        )}
      </div>
    </CardContent>

    {/* Buttons */}
    <CardFooter className="flex justify-between p-4">
      <Button 
        onClick={() => {
          setOpenCreateProducts(true)
          setEditId(product?._id)
          setFormData(product)
          setImageUrl('')
        }} 
        className="bg-indigo-500 text-white hover:bg-indigo-600 transition duration-200"
      >
        Edit
      </Button>

      <Button 
        onClick={() => handleDelete(product._id)} 
        className=" text-white hover:bg-red-600 transition duration-200"
      >
        Delete
      </Button>
    </CardFooter>
  </Card>
  )
}

export default AdminProductTile