import AdminOrdersComp from "@/components/admin-view/AdminOrdersComp"
import { getAllOrders } from "@/redux/admin/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const AdminOrders = () => {
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(getAllOrders())
}, [dispatch]);

  return (
    <div>
      <AdminOrdersComp />
    </div>
  )
}

export default AdminOrders