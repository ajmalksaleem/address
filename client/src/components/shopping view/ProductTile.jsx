import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShoppingProductTile = ({ product , handleGetProductDetails, handleAddToCart}) => {

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={()=>{
        handleGetProductDetails(product?._id)
      }} className="">
        <div className="relative">
          <img
            src={product?.image} 
            alt="img"
            className="w-full h-[220px] object-cover rounded-t-lg"
          />
          {product?.salePrice < product?.price ? (
            <Badge className="absolute top-2 left-2 bg-indigo-400 hover:bg-indigo-300">
              {Math.round(((product?.price - product?.salePrice)/product?.price)*100)}% Off 🔥
            </Badge>
          ) : null}
          {product?.totalStock === 0  && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
          <span>Out of Stock</span>
        </div>
      )}
        </div>
        <CardContent className="pt-2">
          <h2 className="text-xl font-bold mb-1">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center ">
          <span
              className={`${
                product?.salePrice < product?.price  ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice < product?.price ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
        <CardFooter>
            <Button disabled ={product?.totalStock === 0} onClick={()=>handleAddToCart(product._id)} className='w-full'>Add to cart</Button>
        </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
