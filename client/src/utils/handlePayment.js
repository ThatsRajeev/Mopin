import axios from "axios";
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
  });};

const handlePayment = async (name, number, address, dishes, subscriptions, totalCost) => {
  try {
    const orderData = {
      name, number, address, dishes, subscriptions, totalCost
    };

    const response = await axios.post('https://mopin-server.vercel.app/api/payment/orders', orderData, {
      withCredentials: true,
    });

    await axios.post('https://mopin-server.vercel.app/api/order', {
      orderData,
      paymentId: response.data.order_id
    }, {
      withCredentials: true,
    });

    doPayment(response.data.payment_session_id);

  } catch (error) {
    console.error(error);
  }
};

export default handlePayment;
