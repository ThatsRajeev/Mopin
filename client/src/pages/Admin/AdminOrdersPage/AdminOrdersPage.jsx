import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://mopin-server.vercel.app/api/addressdata/ordersdata');
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Admin Orders Page</h2>
      <div>
        <h3>Past Orders</h3>
        <ul>

        </ul>
      </div>
      <div>
        <h3>Upcoming Orders</h3>
        <ul>

        </ul>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
