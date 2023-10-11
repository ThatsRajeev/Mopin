import react, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Login from "./Login";
import ManageAddressContent from './ManageAddressContent';

const Checkout = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [addressChoosen, setAddressChoosen] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/userdata', {
        withCredentials: true
      });
      setName(response.data.name);
      setphoneNumber(response.data.phoneNumber);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/addressdata', {
        withCredentials: true
      });
      setAddress(response.data.apartmentNumber + ", " + response.data.apartmentName + ", " +
                 response.data.streetDetails + ", " + response.data.address);
      setAddressType(response.data.addressType);

    } catch (error) {
      console.error(error);
    }
  };

  const [dishInfo, setdishInfo] = useState({});

  const fetchCartInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cartSummary', {
        withCredentials: true
      });
      const cart = response.data;
      setSellerName(cart[0].sellerName);
      const newdishInfo = {};
      let totalItemCount = 0;
      let totalPriceCount = 0;

      cart.forEach(item => {
        newdishInfo[item.dishName] = {dishName: item.dishName, sellerName: item.sellerName, dishPrice: item.dishPrice, dishQty: item.dishQuantity};
        totalItemCount = totalItemCount+item.dishQuantity;
        totalPriceCount = totalPriceCount+item.dishQuantity*parseInt(item.dishPrice.substring(1));
      });
      setdishInfo(newdishInfo);
      setTotalItems(totalItemCount);
      setTotalPrice(totalPriceCount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/logout', {
        withCredentials: true
      });
      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAddress();
    fetchCartInfo();
  }, []);

  useEffect(() => {
    console.log(dishInfo);
  }, [dishInfo])

  useEffect(() => {
    if(isLogged === true) {
      window.location.reload();
    }
  }, [isLogged])

  const Overlay = ({ children, closeOverlay }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={closeOverlay}
    >
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const verticalLine = {
    height: name=="" ? '62%' : (!addressChoosen ? '70%' : '50%'),
    width: 0,
    position: 'absolute',
    left: '188px',
    border: '1px dashed rgb(0,0,0,0.36)',
    top: '48px',
    zIndex: 1
}

  const LogoutContent = () => {
    return(
      <div>
      {showLogout &&
        <Overlay closeOverlay={() => setShowLogout(false)}>
        <div className="delete-container">
          <h3 className="delete-heading">Are you sure you want to logout? </h3>
          <button className="delete" onClick={handleLogout}>Yes</button>
          <button className="cancel" onClick={() => {setShowLogout(false)}}>Cancel</button>
          <button className="close-button" onClick={() => {setShowLogout(false)}}>×</button>
        </div>
      </Overlay>}
      </div>
    )
  };

  const handleCart = async (name, price, qty) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          sellerName: sellerName,
          dishName: name,
          dishPrice: price,
          dishQuantity: qty
        };
        const response = await axios.post("http://localhost:5000/api/cartSummary", data);
        resolve(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  }

  const handleIncrement = (event, dish) => {
    const counterValue = event.target.previousElementSibling;
    counterValue.textContent = parseInt(counterValue.textContent) + 1;
    setTotalItems(totalItems+1);
    setTotalPrice(totalPrice + parseInt(dish.dishPrice.substring(1)));

    handleCart(dish.dishName, dish.dishPrice, counterValue.textContent);
  };

  const handleDecrement = (event, dish) => {
    const counterValue = event.target.nextElementSibling;
    const newValue = parseInt(counterValue.textContent) - 1;
    if (newValue >= 0) {
      setTotalItems(totalItems-1);
      setTotalPrice(totalPrice - parseInt(dish.dishPrice.substring(1)));

      handleCart(dish.dishName, dish.dishPrice, newValue);
    }
    if(newValue === 0) {
      const counter = event.target.parentElement;
      counter.classList.add('hidden');
      setTimeout(() => {
        counter.style.display = 'none';
      }, 300);
    } else {
      counterValue.textContent = newValue;
    }
  };

  const initPayment = (data)=> {
    const options = {
      key: "rzp_test_vEfERvWyBIr2EW",
      amount: data.amount,
      currency: data.currency,
      name: sellerName,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const {data} = await axios.post('http://localhost:5000/api/payment/verify', {
          }, {
            withCredentials: true
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#f16122",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const handlePayment = async () => {
    try {
      const {data} = await axios.post('http://localhost:5000/api/payment/orders', {
        amount: totalPrice+7+12
      }, {
        withCredentials: true
      });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <Navbar showAddress="none" header="Secure Checkout"/>
    <div style={{display: 'flex'}}>
    <div className="checkout-div">
      <div className="userDetails">
        <div className="detailsHead">
          <div className="logo-circle">
            <span class="material-symbols-outlined" style={{fontSize: '24px'}}>person</span>
          </div>
          {name ? "Logged In" : <div className="deepFocus">Login / Sign Up</div>}
        </div>
        {name ?
        <div className="contactDetails">
          <span style={{fontWeight: "600"}}>{name}</span>
          <span style={{margin: '0 6px'}}>|</span>
          {phoneNumber}
          <a onClick={() => setShowLogout(true)} className="changeUser"> Change User </a>
        </div> :
        <>
        <p className="placeOrder">To place your order now, log in to your account </p>
        <Login fromCheckout='true' setLogged={setLogged}/></>
        }
      </div>
      <LogoutContent />

      <div className="userDetails">
        <div className="detailsHead">
          <div className="logo-circle">
          <span class="material-symbols-outlined" style={{fontSize: '24px'}}>location_on</span>
          </div>
          {addressChoosen ? "Delivery Address" : <div className="deepFocus">Choose Delivery Address</div>}
        </div>
        {addressChoosen ?
        <div className="contactDetails">
          <span style={{fontWeight: "600"}}>{addressType}</span>
          <span style={{margin: '0 6px'}}>|</span>
          {address.substring(0, 56) + "..."}
          <a onClick={() => setAddressChoosen(false)} className="changeUser"> Change </a>
        </div> :
        <>
        {name &&<ManageAddressContent fromCheckout='true' setAddressChoosen={setAddressChoosen}/>}</>
        }
      </div>

      <div className="userDetails">
        <div className="detailsHead">
          <div className="logo-circle">
          <span class="material-symbols-outlined" style={{fontSize: '24px'}}>account_balance_wallet</span>
          </div>
          <div className="deepFocus">Choose Payment Method</div>
        </div>
        <div className="contactDetails">
          <button className="proceedToPay" onClick={handlePayment} disabled={!addressChoosen}>Proceed to Pay</button>
        </div>
      </div>
      <div className="vertical-line" style={verticalLine}></div>
    </div>
    <div className="order-summary">
      <p className="sellerNm">{sellerName}</p>
      {Object.values(dishInfo).map((dish, index) => (
        <div key={index} className="readyCheckout">
          <p className="dishNm">{dish.dishName}</p>
            <div className="counter ck-counter">
              <button className="counter-button" onClick={(e) => handleDecrement(e, dish)}>-</button>
              <span className="counter-value" style={{fontSize: '16px'}}>{dish.dishQty}</span>
              <button className="counter-button" onClick={(e) => handleIncrement(e, dish)} > +</button>
            </div>
          <p>{dish.dishPrice}</p>
        </div>
      ))}
      <div className="bill-details">
        <p style={{fontWeight: '600'}}>Bill Details</p>
        <div className="priceDetails">
          <p>Item Total</p>
          <p>₹{totalPrice}</p>
        </div>
        <div className="priceDetails">
          <p>Delivery Fees</p>
          <p>₹7</p>
        </div>
        <div className="priceDetails">
          <p>Govt Taxes & Other Charges</p>
          <p>₹12</p>
        </div>
        <div style={{border: '1px solid rgb(0,0,0,0.16)'}}></div>
        <div className="priceDetails">
          <p style={{fontWeight: '600', marginTop: '4px'}}>To Pay</p>
          <p>₹{totalPrice+7+12}</p>
        </div>

      </div>
    </div>
    </div>
    </>
  )
}

export default Checkout;
