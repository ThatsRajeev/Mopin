import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import "./AdminOrdersPage.css";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState({});
  const [expandedCustomers, setExpandedCustomers] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://mopin-server.vercel.app/api/ordersdata');
        const sortedOrders = sortOrders(response.data);
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  function trimDate(originalDate) {
    const trimmedDate = new Date(originalDate).toLocaleDateString("en-US", {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return trimmedDate;
  }

  const toggleDate = (date) => {
    setExpandedDates((prevExpanded) => ({
      ...prevExpanded,
      [date]: !prevExpanded[date]
    }));
  };

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

  const copyOrderDetailsToClipboard = (customers) => {
    const orderDetails = customers.map((customer) => (
      `${customer.name}, ${customer.phoneNumber}, ${customer.address}\n- ${customer.quantity} items`
    )).join('\n');

    const textArea = document.createElement('textarea');
    textArea.value = orderDetails;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const sortOrders = (unorderedOrders) => {
    const orderedDates = Object.keys(unorderedOrders).sort((a, b) => new Date(a) - new Date(b));
    const orderedOrders = {};

    orderedDates.forEach(date => {
      orderedOrders[date] = unorderedOrders[date];
    });

    return orderedOrders;
  };

  return (
    <div className="admin-orders-container">
      {loading ? (
        <div>
          <h3><Skeleton width={156} height={36} /></h3>
          <ul>
            <Skeleton height={56} count={5} />
          </ul>
        </div>
      ) : (
        <div>
          <h3>Upcoming Orders</h3>
          {Object.keys(orders).length > 0 ? (
            Object.entries(orders).map(([date, dateObj]) => (
              <div key={date} className="order-date">
                <div className="toggle-arrow" onClick={() => toggleDate(date)}>
                  {expandedDates[date] ? '\u25BC' : '\u25B6'}
                </div>
                <span>{trimDate(date)}</span>
                {expandedDates[date] && Object.entries(dateObj).map(([mealTime, sellers]) => (
                  <div key={mealTime} className="order-time">
                    <div className="toggle-arrow" onClick={() => toggleMealTime(date, mealTime)}>
                      {expandedDates[date]?.[mealTime] ? '\u25BC' : '\u25B6'}
                    </div>
                    <span>{mealTime}</span>
                    {expandedDates[date]?.[mealTime] && Object.entries(sellers).map(([sellerName, { dish, customers }]) => (
                      <div key={sellerName} className="order-seller">
                        <span>{sellerName} &nbsp;</span>
                        {Array.isArray(dish) && dish.length > 0 && (
                          <p className="dishInfo">{dish[0].dishName} - ₹{dish[0].price}</p>
                        )}
                        <div className="order-details">
                          {Array.isArray(customers) && customers.length > 0 && (
                            customers.map((customer, i) => (
                            <>
                              <div
                                key={i}
                                className={`customer ${expandedCustomers[i] ? 'expanded' : ''}`}
                                onClick={() => toggleCustomer(i)}
                              >
                                {customer.name}, {customer.phoneNumber}, {customer.address}
                              </div>
                            <p><b>{customer.quantity} items</b></p>
                          </>
                            ))
                          )}
                        <button className="copy-btn" onClick={() => {copyOrderDetailsToClipboard(customers)}}>
                          <span className="material-symbols-outlined">content_copy</span>
                        </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No upcoming orders.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;