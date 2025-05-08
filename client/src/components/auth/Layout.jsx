import { Navigate, Outlet } from "react-router-dom";
import shopping from "../../assets/shoppingz.svg";
import shopmob from "../../assets/shopmob.svg";
import {
  BadgeDollarSign,
  Percent,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { useSelector } from "react-redux";
const Layout = () => {

 const {isAuthenticated } = useSelector(state => state.auth)

  if (isAuthenticated) {
    return <Navigate to="/shop" replace />
  }

  return (
    <div className="min-h-screen flex w-full ">
      <div className="hidden lg:flex flex-col items-center justify-center w-[40] bg-green-200  px-12 ">
        <div className="max-w-md space-y-6 text-center ">
          <span className="font-mono text-xl">Welcome to........</span>
          <h1 className="text-5xl font-extrabold tracking-tight ">aDDress..</h1>
          <span className="text-sm mb-2 ">Fashion at Your Fingertips</span>
          <div className="flex justify-center">
            <img src={shopping} alt="" />
          </div>
        </div>
        <div className="mt-2 flex gap-10 pt-10 ">
          <ShoppingBag strokeWidth={1} size={20} />
          <Shirt strokeWidth={1} size={20} />
          <BadgeDollarSign strokeWidth={1} size={20} />
          <ShoppingBasket strokeWidth={1} size={20} />
          <Percent strokeWidth={1} size={20} />
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center ">
        <div className="md:hidden pt-6 ">
          <span className="font-mono text-sm">Welcome to........</span>
          <h1 className="text-4xl font-extrabold tracking-tight ">aDDress..</h1>
        </div>

        <div className=" px-8 py-6 sm:px-5 lg:px-8 flex-col flex items-center w-full ">
          <div className=" md:hidden flex flex-col justify-center w-[85%]  items-center size-60 ml-2 ">
            <img src={shopmob} />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
