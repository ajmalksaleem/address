import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ShHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import CartWrapper from "./CartWrapper";
import { fetchCart } from "@/redux/shop/cart-slice";
import { Label } from "@radix-ui/react-label";
import { logoutUser } from "@/redux/auth/authSlice";


const MenuItems = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setsearchParams] = useSearchParams();

  const handleNavigate = (category)=>{
    sessionStorage.removeItem('filters')
      if(category.id === 'home'){
        navigate('/shop')
      }else if(category.id === 'search'){
        navigate('/shop/search')
      }
      else{
      const currentFilter = {
       Category : [category.id]
      }
      sessionStorage.setItem('filters', JSON.stringify(currentFilter)) 
      location.pathname.includes('listing') && currentFilter !== null ? setsearchParams(new URLSearchParams(`?category=${category.id}`)) :
      navigate('/shop/listing?Category')
      }
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {ShHeaderMenuItems.map((item) => (
        <Label key={item.id} onClick={()=>handleNavigate(item)} className="text-sm font-medium cursor-pointer hover:text-indigo-600">
          {item.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRight = () => {
  const {user} = useSelector((state) => state.auth);
  const {cartItems} = useSelector(state=>state.shopCart)
  const navigate = useNavigate()
const [showCartModal, setshowCartModal] = useState(false);
const dispatch = useDispatch()

const fetchCartData = async()=>{
  try {
    setshowCartModal(true)
    console.log(user)
 await dispatch(fetchCart({userId : user?._id}))
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
 dispatch(fetchCart({userId : user?._id}))
}, []);


const handleLogout = ()=>{
  dispatch(logoutUser());
}

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={showCartModal} onOpenChange={()=>setshowCartModal(false)}>
        <div className="relative">
      <Button onClick={()=>fetchCartData()}variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6"  />
        <span className="sr-only">User Cart</span>
      </Button>
      {cartItems?.items?.length > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px]  text-white">
          {cartItems.items?.length}
        </span>
      )}
      </div>
      <CartWrapper 
      setshowCartModal={setshowCartModal}
      cartItems={cartItems} />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
          <UserCog className="mr-2"/>
          Account
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2"/>
          Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-1">
          <span className="font-bold text-xl">aDDress..</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
          <MenuItems/>
          <HeaderRight />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems/>
        </div>
        <div className="hidden lg:block">
          <HeaderRight />
        </div>
       
      </div>
    </header>
  );
};

export default ShHeader;


