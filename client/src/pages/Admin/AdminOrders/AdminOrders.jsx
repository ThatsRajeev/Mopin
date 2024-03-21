import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../store/ordersSlice";
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./AdminOrders.css";

const AdminOrders = () => {
 const [orders, setOrders] = useState([]);
 const [loading, setLoading] = useState(true);
 const [expandedDates, setExpandedDates] = useState({});
 const [expandedCustomers, setExpandedCustomers] = useState([]);
 const dispatch = useDispatch();
 const ordersData = useSelector((state) => state.orders.items);
 const ordersStatus = useSelector((state) => state.orders.status);

 useEffect(() => {
  dispatch(fetchOrders());
 }, [dispatch]);

 useEffect(() => {
  if(Object.keys(ordersData).length) {
   setOrders(transformFrontendData(ordersData));
   setLoading(false);
  }
 }, [ordersData]);

 function trimDate(originalDate) {
  const trimmedDate = new Date(originalDate).toLocaleDateString("en-US", {
   weekday: 'short',
   month: 'short',
   day: 'numeric',
   year: 'numeric'
  });

  return trimmedDate;
 }

 const toggleMealTime = (date, mealTime) => {
  setExpandedDates((prevExpanded) => ({
   ...prevExpanded,
   [date]: {
    ...prevExpanded[date],
    [mealTime]: !prevExpanded[date]?.[mealTime]
   }
  }));
 };

 const toggleCustomer = (index) => {
  const updatedCustomers = [...expandedCustomers];
  updatedCustomers[index] = !updatedCustomers[index];
  setExpandedCustomers(updatedCustomers);
 };

const columns = [
   { id: 'date', label: 'Date', align: 'left' },
   { id: 'mealTime', label: 'Meal Time', align: 'left' },
   { id: 'seller', label: 'Seller', align: 'left' },
   { id: 'dish', label: 'Dish', align: 'left' },
   { id: 'customers', label: 'Customers', align: 'left' },
];

const transformFrontendData = (ordersData) => {
    const transformedData = Object.entries(ordersData).map(([date, dateObj]) => {
      return Object.entries(dateObj).map(([mealTime, mealTimeObj]) => {
        return Object.entries(mealTimeObj).map(([seller, sellerObj]) => {
          return {
            date,
            mealTime,
            seller,
            dish: sellerObj.dish,
            customers: sellerObj.customers
          };
        });
      });
    }).flat(2);
    return transformedData;
  };

 return (
  <div className="admin-orders-container">
   {loading ? (
    <div className="skeleton">
     {Array(6).fill().map((item, index) => (
      <div key={index} className="skeleton-item">
       <Skeleton variant="text" width={`52%`} height={24} />
       <Skeleton variant="text" width={`68%`} height={24} />
       <Skeleton variant="rectangular" width={`86%`} height={100} />
      </div>
      ))}
    </div>
   ) : (
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="orders table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) && orders.map((order) => (
            <TableRow key={order.date + order.mealTime + order.seller}>
              <TableCell>{trimDate(order.date)}</TableCell>
              <TableCell>{order.mealTime}</TableCell>
              <TableCell>{order.seller}</TableCell>
              <TableCell>{order.dish.dishName} - ₹{order.dish.price}</TableCell>
              <TableCell>
                {order.customers.map((customer, index) => (
                  <div key={index}>
                    <b>{customer.name}</b>, {customer.phoneNumber}, {customer.address}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   )}
  </div>
 );
};

export default AdminOrders;
