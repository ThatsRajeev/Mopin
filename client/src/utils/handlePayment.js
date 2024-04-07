import axios from "axios";
import { toast } from "react-hot-toast";
import { load } from "@cashfreepayments/cashfree-js";

const doPayment = async (payment_session_id) => {
  const cashfree = await load({
      mode: "sandbox"
  });

  let checkoutOptions = {
      paymentSessionId: payment_session_id,
      redirectTarget: "_self",
  };

  cashfree.checkout(checkoutOptions).then(function(result){
  	if(result.error){
  		alert(result.error.message)
  	}
  	if(result.redirect){
  		console.log("Redirection")
  	}
  });
};

const handlePayment = async (name, number, uid, address, dishes, subscriptions, totalCost, setLoading) => {
  try {
    setLoading(true);
    const orderData = {
      name, number, uid, address, dishes, subscriptions, totalCost
    };

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/payments`, orderData, {
      withCredentials: true,
    });

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders`, {
      orderData,
      orderId: response.data.order_id
    }, {
      withCredentials: true,
    });

    doPayment(response.data.payment_session_id);

  } catch (error) {
    setLoading(false);
    console.error(error);
    toast.error('An error occurred during payment. Please try again.');
  }
};

export default handlePayment;
