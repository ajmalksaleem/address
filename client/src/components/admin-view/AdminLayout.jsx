import { Navigate, Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"
import { useState } from "react";
import { useSelector } from "react-redux";

const AdminLayout = () => {

  const {isAuthenticated ,user} = useSelector(state => state.auth)
  const [openSidebar, setOpenSidebar] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  if (user?.role === 'user') {
    return <Navigate to="/shop" replace />
  }

  return (
    <div className="flex min-h-screen w-full">
    <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
    <AdminHeader setOpen={setOpenSidebar}/>
    <main className="bg-muted/40 flex flex-col flex-1 p-4 md:p-6">
    <Outlet/>
    </main>
        </div>
    </div>
  )
}

export default AdminLayout