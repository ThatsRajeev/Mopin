import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';

function OrderSuccessPage() {
  const [snackbar, setSnackbar] = useState(true);
  const [orderStatus, setOrderStatus] = useState('Processing');
  const { order_id } = useParams();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.post(
          'https://mopin-server.vercel.app/api/payment/paymentstatus',
          { payment_id: order_id },
          { withCredentials: true }
        );

        const { paymentStatuses } = response.data;
console.log(response.data);
        const isOrderSuccessful = paymentStatuses.every(
          (order) => order.paymentStatus === 'SUCCESS'
        );

        setOrderStatus(isOrderSuccessful ? 'Success' : 'Failed');
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, [order_id]);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={6}>
        <Card style={{ padding: '20px', textAlign: 'center' }}>
          {orderStatus === 'Success' ? (
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
                style={{ marginTop: '20px' }}
              >
                View Order
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Oops! Something went wrong.
              </Typography>
              <Typography variant="body1">
                We're sorry, but there was an issue processing your order. Please try again.
              </Typography>
            </>
          )}
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/" // Assuming a route for the homepage
            style={{ marginTop: '20px' }}
          >
            Continue Shopping
          </Button>
        </Card>
      </Grid>
      <Snackbar open={snackbar} autoHideDuration={3000} message="Thank you for your order!" />
    </Grid>
  );
}

export default OrderSuccessPage;
