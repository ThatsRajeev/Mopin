import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../store/ordersSlice";
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Tooltip, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import "./AdminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [expandedCustomers, setExpandedCustomers] = useState([]);
    const dispatch = useDispatch();
    const ordersData = useSelector((state) => state.orders.items);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(ordersData).length) {
            setOrders(transformFrontendData(ordersData));
            setLoading(false);
        }
    }, [ordersData]);

    const columns = [
        { id: 'date', label: 'Date', align: 'left' },
        { id: 'seller', label: 'Seller', align: 'left' },
        { id: 'dish', label: 'Dish', align: 'left' },
        { id: 'totalAmount', label: 'Total Amount', align: 'left' },
        { id: 'customers', label: 'Customers', align: 'left' },
        { id: 'status', label: 'Status', align: 'left' },
        { id: 'actions', label: 'Actions', align: 'left' }
    ];

    function trimDate(originalDate) {
        const trimmedDate = new Date(originalDate).toLocaleDateString("en-US", {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return trimmedDate;
    }

    const transformFrontendData = (ordersData) => {
        const transformedData = Object.entries(ordersData).map(([date, dateObj]) => {
            return Object.entries(dateObj).map(([mealTime, mealTimeObj]) => {
                return Object.entries(mealTimeObj).map(([seller, sellerObj]) => {
                    return {
                        date,
                        mealTime,
                        seller,
                        sellerTotal: sellerObj.sellerTotal,
                        dish: sellerObj.dish,
                        customers: sellerObj.customers
                    };
                });
            });
        }).flat(2);
        return transformedData;
    };

    const handleStatusChange = async (order, status) => {
        try {
            await Promise.all(order.customers.map(async (o) => {
                await axios.patch(process.env.REACT_APP_SERVER_URL + '/orders', {
                    orderId: o.orderId,
                    sellerName: order.seller,
                    dishName: order.dish.dishName,
                    paymentStatus: status
                }, {
                    withCredentials: true,
                });
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#FFC107'; // yellow
            case 'Success':
                return '#4CAF50'; // green
            case 'Failed':
                return '#F44336'; // red
            case 'Refunded':
                return '#9E9E9E'; // gray
            default:
                return '#000000'; // default color
        }
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
                <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
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
                            {Array.isArray(orders) && orders.map((order, index) => (
                                <TableRow key={order.date + order.mealTime + order.seller}>
                                    <TableCell>{trimDate(order.date)}</TableCell>
                                    <TableCell>{order.seller}</TableCell>
                                    <TableCell>{order.dish.dishName} x {order.dish.quantity} <b>({order.mealTime.substring(0, 1)})</b></TableCell>
                                    <TableCell>₹{order.sellerTotal}</TableCell>
                                    <TableCell sx={{maxWidth: '320px'}}>
                                        {
                                          order.customers.map((customer, index) => (
                                              <div key={index}>
                                                  <b>{customer.name}</b>, {customer.phoneNumber}, {customer.address}
                                              </div>
                                          ))
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {isEditing ? <Select
                                            value={order.dish.status}
                                            onChange={(e) => {
                                                handleStatusChange(order, e.target.value);
                                                setIsEditing(false);
                                            }}
                                            size="small"
                                        >
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Success">Success</MenuItem>
                                            <MenuItem value="Failed">Failed</MenuItem>
                                            <MenuItem value="Refunded">Refunded</MenuItem>
                                        </Select> :

                                            <Button
                                                variant="contained"
                                                size="medium"
                                                style={{ backgroundColor: getStatusColor(order.dish.status) }}
                                            >
                                                {order.dish.status}
                                            </Button>
                                        }
                                    </TableCell>
                                    <TableCell>
                                      <div style={{display: 'flex'}}>
                                        <Tooltip title="View Customer">
                                            <IconButton>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit Status">
                                            <IconButton onClick={() => setIsEditing(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                      </div>
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
