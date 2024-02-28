import axios from "axios";

const doPayment = async (cashfree, payment_session_id) => {
  let checkoutOptions = {
      paymentSessionId: payment_session_id,
      redirectTarget: "_self",
  };
  cashfree.checkout(checkoutOptions);
  console.log(cashfree);
};

const handlePayment = async (name, number, address, dishes, subscriptions, totalCost, cashfree) => {
  try {
    const orderData = {
      name, number, address, dishes, subscriptions, totalCost
    };

    const response = await axios.post('https://mopin-server.vercel.app/api/payment/orders', orderData, {
      withCredentials: true,
    });
    doPayment(cashfree, response.payment_session_id);

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
