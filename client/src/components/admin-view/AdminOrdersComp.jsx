import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import OrderDetails from './OrderDetails'
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'

const AdminOrdersComp = () => {
  const {orderList} = useSelector((state)=>state.adminOrders)
  const statusColors = {
    delivered: "bg-blue-500",
    rejected: "bg-red-500",
    inProcess: "bg-violet-500",
    inShipping: "bg-teal-500",
    pending: "bg-orange-400",
    confirmed: "bg-green-500", 
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? orderList.map((orderItem,index)=>(

            <TableRow key={index}>
              <TableCell>{orderItem.userId.username}</TableCell>
              <TableCell> {new Date(orderItem.orderDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}</TableCell>
              <TableCell><Badge className={`${statusColors[orderItem?.orderStatus] || 'bg-gray-300'}`}>
                {orderItem.orderStatus}</Badge></TableCell>
              <TableCell>$ {orderItem.totalAmount}</TableCell>
              <TableCell>
                <OrderDetails OrderDetails={orderItem}/>
              </TableCell>
            </TableRow> 
            )) : null
          }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersComp