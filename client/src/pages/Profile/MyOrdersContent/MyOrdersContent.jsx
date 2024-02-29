import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useUserAuth } from '../../../context/AuthContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import './MyOrdersContent.css';

const MyOrdersContent = () => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  function trimDate(originalDate) {
    const trimmedDate = new Date(originalDate).toLocaleDateString("en-US", {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return trimmedDate;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && Object.keys(user).length !== 0) {
          const response = await axios.get(`https://mopin-server.vercel.app/api/orders/${user.phoneNumber}`);
          setOrders(response.data.orders);
          console.log(response.data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.phoneNumber]);

  return (
    <div className="component">
      {loading ? (
        <div className="skeleton">
          {Array(4).fill().map((item, index) => (
              <div key={index}>
                <Skeleton height={24} width={`48vw`} />
                <Skeleton height={24} width={`64vw`} />
                <Skeleton width={`80vw`} height={100} />
              </div>
            ))}
        </div>
      ) : (
        <div className="orders-container">
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
            <ul>
              {orders.map((order) => (
                <li key={order.orderId} className="order-item">
                  <div className="order-header">
                    {order.paymentStatus === "SUCCESS" ? (
                      <span>
                        <CheckCircleIcon style={{ color: '#349E46' }} />
                        <h4>&nbsp;Order Confirmed</h4>
                      </span>
                    ) : (
                      <span>
                        <ErrorIcon style={{ color: '#fa4a5b' }} />
                        <h4>&nbsp;Cancelled</h4>
                      </span>
                    )}
                    <div>
                      <p><b># {order.orderId}</b></p>
                      <p>{trimDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <hr />
                  <h3><b>{order.sellerName}</b></h3>
                  <div className="order-items">
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.dishName}>
                          <span>{item.quantity} x {item.dishName}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div className="order-buttons">
                    <Button variant="contained" style={{ backgroundColor: '#f16122', color: '#fff', margin: '12px 12px 0 0' }}>
                      Reorder
                    </Button>
                    <Button variant="outlined" style={{ color: '#f16122', border: '1px solid #f16122', margin: '12px 12px 0 0' }}>
                      View Order Details
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrdersContent;
