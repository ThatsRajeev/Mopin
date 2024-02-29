import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWindowResize from "../../../hooks/useWindowResize";
import Navbar from "../../../components/Navbar/Navbar";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { Link, useSearchParams } from 'react-router-dom';
import './OrderSuccessPage.css';

function OrderSuccessPage() {
  const [snackbar, setSnackbar] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
  const windowWidth = useWindowResize();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          'https://mopin-server.vercel.app/api/payment/paymentstatus',
          { payment_id: order_id },
          { withCredentials: true }
        );

        const { paymentStatuses } = response.data;

        const isOrderSuccessful = paymentStatuses.every(
          (order) => order.paymentStatus === 'SUCCESS'
        );

        setOrderStatus(isOrderSuccessful ? 'Success' : 'Failed');
      } catch (error) {
        console.error('Error fetching order status:', error);
        setOrderStatus('Failed');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderStatus();
  }, [order_id]);

  return (
    <>
    <Navbar header="Order Tracking" showAddress="none" showNavbar = {windowWidth < 768 ? "none" : ""}/>
    <Grid container justifyContent="center" alignItems="center" className="order-success-container">
      <Grid item xs={10} sm={6}>
        <Card className="order-card">
          {isLoading ? (
            <div className="loading-spinner">
              <CircularProgress />
            </div>
          ) : orderStatus === 'Success' ? (
            <>
              <CheckCircleIcon className="success-icon" />
              <Typography variant="h4" className="success-heading">
                Your Order is Confirmed!
              </Typography>
              <Typography variant="body1" className="success-message">
                Thank you for ordering homemade food! Your order has been successfully placed.
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to={`/view-order/${order_id}`} // Assuming a route for viewing order details
                className="view-order-button"
              >
                View Order
              </Button>
            </>
          ) : (
            <>
              <ErrorIcon className="error-icon" />
              <Typography variant="h4" className="error-heading">
                Payment Failed
              </Typography>
              <Typography variant="body1" className="error-message">
                We're sorry, but there was an issue processing your payment. Please try again or contact support.
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/" // Assuming a route for the homepage
            className="continue-shopping-button"
          >
            Continue Browsing
          </Button>
        </Card>
      </Grid>
    </Grid>
    </>
  );
}

export default OrderSuccessPage;
