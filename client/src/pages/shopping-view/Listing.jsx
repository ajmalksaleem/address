import Filter from "@/components/shopping view/Filter";
import ProductDetails from "@/components/shopping view/ProductDetails";
import ShoppingProductTile from "@/components/shopping view/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCart } from "@/redux/shop/cart-slice";
import {
  fetchProductDetails,
  fetchShopProducts,
} from "@/redux/shop/product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
const ITEMS_PER_PAGE = 8;

const Listing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [Filters, setFilters] = useState({});
  const [Sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetails, setopenDetails] = useState(false);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productList?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = productList.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const categorySearchParams = searchParams.get("category");

  const createSearchParamsHelper = (filterParams) => {
    const QueryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        QueryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return QueryParams.join("&");
  };

  useEffect(() => {
    if (Filters !== null && Sort !== null)
      dispatch(fetchShopProducts({ filterParams: Filters, sortParams: Sort }));
    //setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [dispatch, Sort, Filters]);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (sectionId, currentOption) => {
    let cFilters = { ...Filters };
    const indexOfCurrentSection = Object.keys(cFilters).indexOf(sectionId);
    if (indexOfCurrentSection === -1) {
      cFilters = {
        ...cFilters,
        [sectionId]: [currentOption],
      };
    } else {
      const indexOfCurrentOption = cFilters[sectionId].indexOf(currentOption);

      if (indexOfCurrentOption === -1) cFilters[sectionId].push(currentOption);
      else cFilters[sectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cFilters);
    sessionStorage.setItem("filters", JSON.stringify(cFilters));
  };

  useEffect(() => {
    if (Filters && Object.keys(Filters).length > 0) {
      const createQueryString = createSearchParamsHelper(Filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [Filters]);

  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  const handleGetProductDetails = async (productId) => {
    const result = await dispatch(fetchProductDetails(productId));
    //console.log(result.payload.data);
  };

  useEffect(() => {
    if (productDetails !== null) {
      setopenDetails(true);
    }
  }, [productDetails]);

  const handleAddToCart = async (productId) => {
    const data = await dispatch(
      addToCart({ userId: user?._id, productId, quantity: 1 })
    );
    if (data?.payload?.success) {
      await dispatch(fetchCart({ userId: user?._id }));
      await dispatch(
        fetchShopProducts({ filterParams: Filters, sortParams: Sort })
      );
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

  // Inside your Listing component:
  const location = useLocation();

  useEffect(() => {
    setopenDetails(false);
    // Or dispatch an action to clear productDetails
  }, [location.pathname]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <Filter handleFilter={handleFilter} Filters={Filters} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex gap-4 items-center">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={Sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.key}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 lg:grid-cols-4">
          {currentProducts && currentProducts.length>0 ? (
            currentProducts.map((product) => (
              <ShoppingProductTile
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p>no products available</p>
          )}
        </div>
        <div className="mt-8 border">
           <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={handlePrevious} 
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} 
              />
            </PaginationItem>

            <PaginationItem>
              <div className="px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </div>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext 
                onClick={handleNext} 
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} 
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        </div>
      </div>
      <ProductDetails
        open={openDetails}
        setOpen={setopenDetails}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Listing;

// import Filter from "@/components/shopping view/Filter";
// import ProductDetails from "@/components/shopping view/ProductDetails";
// import ShoppingProductTile from "@/components/shopping view/ProductTile";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { sortOptions } from "@/config";
// import { useToast } from "@/hooks/use-toast";
// import { addToCart, fetchCart } from "@/redux/shop/cart-slice";
// import {
//   fetchProductDetails,
//   fetchShopProducts,
// } from "@/redux/shop/product-slice";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const Listing = () => {
//   const dispatch = useDispatch();
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const { user } = useSelector((state) => state.auth);
//   const [Filters, setFilters] = useState({});
//   const [Sort, setSort] = useState("price-lowtohigh");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [openDetails, setopenDetails] = useState(false);
//   const { toast } = useToast();

//   const categorySearchParams = searchParams.get("category");

//   const createSearchParamsHelper = (filterParams) => {
//     const QueryParams = [];

//     for (const [key, value] of Object.entries(filterParams)) {
//       if (Array.isArray(value) && value.length > 0) {
//         const paramValue = value.join(",");
//         QueryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//       }
//     }
//     return QueryParams.join("&");
//   };

//   useEffect(() => {
//     if (Filters !== null && Sort !== null)
//       dispatch(fetchShopProducts({ filterParams: Filters, sortParams: Sort }));
//     //setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, [dispatch, Sort, Filters]);

//   const handleSort = (value) => {
//     setSort(value);
//   };

//   const handleFilter = (sectionId, currentOption) => {
//     let cFilters = { ...Filters };
//     const indexOfCurrentSection = Object.keys(cFilters).indexOf(sectionId);
//     if (indexOfCurrentSection === -1) {
//       cFilters = {
//         ...cFilters,
//         [sectionId]: [currentOption],
//       };
//     } else {
//       const indexOfCurrentOption = cFilters[sectionId].indexOf(currentOption);

//       if (indexOfCurrentOption === -1) cFilters[sectionId].push(currentOption);
//       else cFilters[sectionId].splice(indexOfCurrentOption, 1);
//     }
//     setFilters(cFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cFilters));
//   };

//   useEffect(() => {
//     if (Filters && Object.keys(Filters).length > 0) {
//       const createQueryString = createSearchParamsHelper(Filters);
//       setSearchParams(new URLSearchParams(createQueryString));
//     }
//   }, [Filters]);

//   useEffect(() => {
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, [categorySearchParams]);

//   const handleGetProductDetails = async (productId) => {
//     const result = await dispatch(fetchProductDetails(productId));
//     //console.log(result.payload.data);
//   };

//   useEffect(() => {
//     if (productDetails !== null) {
//       setopenDetails(true);
//     }
//   }, [productDetails]);

//   const handleAddToCart = async (productId) => {
//     const data = await dispatch(addToCart({ userId: user?._id, productId, quantity: 1 }));
//     if (data?.payload?.success) {
//       await dispatch(fetchCart({ userId: user?._id }));
//       await dispatch(fetchShopProducts({ filterParams: Filters, sortParams: Sort }) );
//       toast({
//         title: "Product is added to cart",
//         variant: "success",
//       });
//     }else{
//       console.log(data)
//       toast({
//         title :  data?.payload?.error,
//         description : 'Add to cart failed',
//         variant: "destructive",
//       })
//     }
//   };

//   // Inside your Listing component:
//   const location = useLocation();

//   useEffect(() => {
//     setopenDetails(false);
//     // Or dispatch an action to clear productDetails
//   }, [location.pathname]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
//       <Filter handleFilter={handleFilter} Filters={Filters} />
//       <div className="bg-background w-full rounded-lg shadow-sm">
//         <div className="p-4 border-b flex items-center justify-between">
//           <h2 className="text-lg font-extrabold">All Products</h2>
//           <div className="flex gap-4 items-center">
//             <span className="text-muted-foreground">
//               {productList?.length} Products
//             </span>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-1"
//                 >
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   <span>Sort by</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-[200px]">
//                 <DropdownMenuRadioGroup value={Sort} onValueChange={handleSort}>
//                   {sortOptions.map((item) => (
//                     <DropdownMenuRadioItem value={item.id} key={item.key}>
//                       {item.label}
//                     </DropdownMenuRadioItem>
//                   ))}
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 lg:grid-cols-4">
//           {productList && productList.length > 0 ? (
//             productList.map((product) => (
//               <ShoppingProductTile
//                 product={product}
//                 handleGetProductDetails={handleGetProductDetails}
//                 handleAddToCart={handleAddToCart}
//               />
//             ))
//           ) : (
//             <p>no products available</p>
//           )}
//         </div>
//       </div>
//       <ProductDetails
//         open={openDetails}
//         setOpen={setopenDetails}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// };

// export default Listing;
