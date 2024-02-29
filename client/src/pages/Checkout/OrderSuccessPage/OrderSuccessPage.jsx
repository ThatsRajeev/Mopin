import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { Link, useSearchParams } from 'react-router-dom';

function OrderSuccessPage() {
  const [snackbar, setSnackbar] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const order_id = searchParams.get("order_id")

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
        toast.error('An error occurred while fetching order status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderStatus();
  }, [order_id]);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6}>
        <Card style={{ padding: '20px', textAlign: 'center' }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <CircularProgress />
            </div>
          ) : orderStatus === 'Success' ? (
            <>
              <Typography variant="h4" gutterBottom>
                <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
                Your Order is Confirmed!
              </Typography>
              <Typography variant="body1">
                Thank you for ordering homemade food! Your order has been successfully placed.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/view-order/${order_id}`} // Assuming a route for viewing order details
                style={{ marginTop: '20px', backgroundColor: '#f16122', color: '#fff', marginRight: '12px' }}
              >
                View Order
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                <ErrorIcon sx={{ fontSize: 40, color: 'error.main' }} />
                Payment Failed
              </Typography>
              <Typography variant="body1">
                We're sorry, but there was an issue processing your payment. Please try again or contact support.
              </Typography>
            </>
          )}
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/" // Assuming a route for the homepage
            style={{ marginTop: '20px', borderColor: '#f16122', color: '#f16122' }}
          >
            Continue Shopping
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default OrderSuccessPage;
