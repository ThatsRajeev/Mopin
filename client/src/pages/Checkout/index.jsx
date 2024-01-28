import react, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useWindowResize from "../../hooks/useWindowResize";
import { fetchFullCartInfo } from "../../utils/fetchCartInfo";
import Navbar from "../../components/Navbar/Navbar";
import UserDetails from "./UserDetails/UserDetails";
import OrderSummary from "./OrderSummary/OrderSummary";

const Checkout = () => {
  const [dishInfo, setdishInfo] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const windowWidth = useWindowResize();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    fetchFullCartInfo(cart, setdishInfo, setTotalItems, setTotalPrice);
  }, []);

  return (
    <>
      <Navbar showAddress="none" header="Secure Checkout" showNavbar = {windowWidth < 768 ? "none" : ""}/>
      {dishInfo.length > 0 ? (
      <div className="checkout-container">
        <div className="checkout-div">
          <UserDetails
            totalPrice={totalPrice}
            setdishInfo={setdishInfo}
          />
          <OrderSummary
            dishInfo={dishInfo}
            setdishInfo={setdishInfo}
          />
        </div>
      </div> ) : (
      <div className="empty-cart">
        <div className="empty-cart-img skeleton"></div>
        <h3>Your cart is empty</h3>
        <p>You can go back back to homepage to view homechefs</p>
        <button className="explore-btn" onClick={() => navigate("/")}>Explore Food</button>
      </div>
      )}
    </>
  )
}

export default Checkout;
