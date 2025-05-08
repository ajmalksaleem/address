import ProductDetails from '@/components/shopping view/ProductDetails';
import ShoppingProductTile from '@/components/shopping view/ProductTile';
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast';
import { addToCart } from '@/redux/shop/cart-slice';
import { fetchProductDetails, resetSearchResults, searchProducts } from '@/redux/shop/product-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { searchResults } = useSelector((state) => state.shopProducts);
    const { productDetails } = useSelector((state) => state.shopProducts);
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();

    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
          setTimeout(() => {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(searchProducts(keyword));
          }, 1000);
        } else {
          setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
          dispatch(resetSearchResults());
        }
      }, [keyword]);


      const handleGetProductDetails = (productId)=>{
        dispatch(fetchProductDetails(productId))
      }

      useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
      }, [productDetails]);
    

  const location = useLocation();
  useEffect(() => {
    setOpenDetailsDialog(false);
  }, [location.pathname]);

  const handleAddToCart = async (productId) => {
      const data = await dispatch(
        addToCart({ userId: user?._id, productId, quantity: 1 })
      );
      if (data?.payload?.success) {
        toast({
          title: "Product is added to cart",
          variant: "success",
        });
      } else {
        console.log(data);
        toast({
          title: data?.payload?.error,
          description: "Add to cart failed",
          variant: "destructive",
        });
      }
    };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            className="py-6"
            placeholder="Search Products..."
            onChange={(e)=>setKeyword(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults?.map((item) => (
          <ShoppingProductTile
          handleAddToCart={handleAddToCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}

export default Search