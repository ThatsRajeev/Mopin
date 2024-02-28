import react, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';

function OrderSuccessPage() {
  const [snackbar, setSnackbar] = useState(true);
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={6}>
        <Card>
          {/* Order summary, delivery info, etc. */}
          <Typography variant="h4" align="center" gutterBottom>
            <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
            Your Order is Confirmed!
          </Typography>
        </Card>
      </Grid>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        message="Thank you for your order!"
      />
    </Grid>
  );
}

export default OrderSuccessPage;
