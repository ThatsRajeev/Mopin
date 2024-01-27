import axios from "axios";

const initPayment = (data)=> {
  const options = {
    key: "rzp_test_vEfERvWyBIr2EW",
    amount: data.amount,
    currency: data.currency,
    name: "Mopin",
    description: "Test Transaction",
    order_id: data.id,
    handler: async (response) => {
      try {
        const {data} = await axios.post('https://mopin-server.vercel.app/api/payment/verify', {
        }, {
          withCredentials: true
        });
      } catch (error) {
        console.error(error);
      }
    },
    theme: {
      color: "#f16122",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
}

const handlePayment = async ( totalPrice, setdishInfo ) => {
  try {
    console.log(totalPrice);
    const {data} = await axios.post('https://mopin-server.vercel.app/api/payment/orders', {
      amount: parseInt(totalPrice+7+4)
    }, {
      withCredentials: true
    });
    initPayment(data.data);

    setdishInfo({});
    localStorage.removeItem('cart');
  } catch (error) {
    console.error(error);
  }
}

export default handlePayment;
