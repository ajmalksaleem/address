import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShOrderDetails from "./ShOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "@/redux/shop/order-slice";
import { Badge } from "../ui/badge";

const shoppingOrders = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.shopOrders);
  const { user } = useSelector((state) => state.auth);

  const statusColors = {
    delivered: "bg-blue-500",
    rejected: "bg-red-500",
    inProcess: "bg-violet-500",
    inShipping: "bg-teal-500",
    pending: "bg-orange-400",
    confirmed: "bg-green-500", 
  };

  useEffect(() => {
    dispatch(getUserOrders({ userId: user?._id }));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList &&
              orderList.length > 0 &&
              orderList.map((order) => (
                <TableRow>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell><Badge className={`${statusColors[order.orderStatus] || 'bg-gray-300'}`}>{order.orderStatus}</Badge></TableCell>
                  <TableCell>$ {order.totalAmount}</TableCell>
                  <TableCell>
                      <ShOrderDetails orderDetail={order}/>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default shoppingOrders;
