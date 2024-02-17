import { useEffect, useState } from 'react';
import { useUserAuth } from '../../../context/AuthContext';
import axios from 'axios';
import './MyOrdersContent.css';

const MyOrdersContent = () => {
  const { user } = useUserAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && Object.keys(user).length !== 0) {
          const response = await axios.get(`https://mopin-server.vercel.app/api/orders/${user.phoneNumber}`);
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user.phoneNumber]);

  return (
    <div className="component">
      {orders.length === 0 ? (
        <>
          <img
            className="default-img"
            src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/_0d3b19ad-bc5d-40ed-923a-ce2caabe524e+(1).avif"
            alt="Default"
          />
          <h2 className="coming-soon">You don't have any orders!</h2>
          <button className="explore-btn">Explore Dishes</button>
        </>
      ) : (
        <div className="orders-container">
          <h2>Your Orders</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.orderId}>
                <h3>Order ID: {order.orderId}</h3>
                <p>Seller: {order.sellerName}</p>
                {/* Display other order details */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyOrdersContent;
