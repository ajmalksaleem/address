import ProductImageUpload from "@/components/admin-view/ImageUpload";
import AdminProductTile from "@/components/admin-view/ProductTile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/redux/admin/product-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {
  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [FormData, setFormData] = useState(initialFormData);
  const [ImageFile, setImageFile] = useState(null);
  const [ImageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [EditId, setEditId] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(0);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (EditId !== null) {  
        dispatch(
          editProduct({ productId : EditId.toString(), 
            formData: { 
              ...FormData, 
              ...(ImageUrl.length>0 && { image: ImageUrl }) 
            } 
          })
        );
      } else {
        const data = dispatch(
          addNewProduct({
            ...FormData,
            image: ImageUrl,
          })
        );
      }
      setFormData(initialFormData);
      dispatch(fetchAllProducts);
      toast({
        title: "Product Added",
        description: "Product Added Successfully",
        variant: "success",
      });
      setOpenCreateProducts(false);
      setRefreshProducts(()=>refreshProducts+1)
    } catch (error) {
      toast({
        title: "Failed",
        description: "",
        variant: "destructive",
      });
    }
  };


  const handleDelete = (deleteProductId)=>{
      try {
        dispatch(deleteProduct(deleteProductId))
        setRefreshProducts(()=>refreshProducts+1)
        toast({
          title: "Product Deleted",
          description: "Product Deleted Successfully",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Failed",
          description: error.response.data.message,
          variant: "destructive",
        });
      }
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [refreshProducts]);


  const isFormValid = ()=>{
   return Object.keys(FormData).map((key)=>FormData[key] !== '').every((item)=>item)
  } 

  
  
  return (
    <>
      <div className="mb-5 w-full flex justify-end ">
        <Button
          onClick={() => {
            setOpenCreateProducts(true);
            setFormData(initialFormData);
            setEditId(null);
          }}
        >
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grids-cols-3 lg:grid-cols-4">
        {productList?.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                product={product}
                setEditId={setEditId}
                setOpenCreateProducts={setOpenCreateProducts}
                setFormData={setFormData}
                setImageUrl={setImageUrl}
                handleDelete={handleDelete}
                key={product._id}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProducts}
        onOpenChange={() => setOpenCreateProducts(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {EditId ? "Edit product" : "Add new product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            ImageFile={ImageFile}
            setImageFile={setImageFile}
            ImageUrl={ImageUrl}
            setImageUrl={setImageUrl}
            ImageLoading={imageLoading}
            setImageLoading={setImageLoading}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              formData={FormData}
              setFormData={setFormData}
              buttonText={EditId ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
