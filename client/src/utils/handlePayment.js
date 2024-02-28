import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const doPayment = async (cashfree, payment_session_id) => {
  let checkoutOptions = {
      paymentSessionId: payment_session_id,
      redirectTarget: "_self",
  };
  cashfree.checkout(checkoutOptions);
};

const handlePayment = async (name, number, address, dishes, subscriptions, totalCost) => {
  try {
    let cashfree;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox"
        });
    }
    initializeSDK();

    const orderData = {
      name,
      number,
      address,
      dishes,
      subscriptions,
      totalCost
    };

    const response = await axios.post('https://mopin-server.vercel.app/api/payment/orders', orderData, {
      withCredentials: true,
    });
    console.log(response.data);

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
