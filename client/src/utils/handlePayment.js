import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const doPayment = async (payment_session_id) => {
  let cashfree;
  var initializeSDK = async function () {
      cashfree = await load({
          mode: "sandbox"
      });
  }
  initializeSDK();

  let checkoutOptions = {
      paymentSessionId: payment_session_id,
      redirectTarget: "_self",
  };
  cashfree.checkout(checkoutOptions);
  console.log(cashfree);
};

const handlePayment = async (name, number, address, dishes, subscriptions, totalCost) => {
  try {
    const orderData = {
      name, number, address, dishes, subscriptions, totalCost
    };

    const response = await axios.post('https://mopin-server.vercel.app/api/payment/orders', orderData, {
      withCredentials: true,
    });
    doPayment(response.payment_session_id);

    // await axios.post('https://mopin-server.vercel.app/api/order', {
    //   orderData,
    //   orderId: response.order_id
    // }, {
    //   withCredentials: true,
    // });
  } catch (error) {
    console.error(error);
  }
};

export default handlePayment;
