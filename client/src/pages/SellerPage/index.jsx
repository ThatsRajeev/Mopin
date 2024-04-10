import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import useWindowResize from "../../hooks/useWindowResize";
import SellerDetailsSection from "./SellerDetailsSection/SellerDetailsSection";
import MealFilterContainer from "./MealFilterContainer/MealFilterContainer";
import CartContainer from "./CartContainer/CartContainer";
import MealSubscription from "./MealSubscription/MealSubscription";
import MeetTheMakers from "./MeetTheMakers/MeetTheMakers";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CircularProgress from '@mui/material/CircularProgress';

function SellerPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productsStatus = useSelector((state) => state.products.status);
  const { sellerId } = useParams();
  const sellerDetails = products.find(item => item && item.name === sellerId); // Add null check here
  const dishes = useSelector((state) => state.dishes);
  const dishesData = useMemo(() => dishes.bySeller[sellerDetails?.name] || {}, [dishes.bySeller[sellerDetails?.name]])
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const windowWidth = useWindowResize();

  useEffect(() => {
    let newTotalItems = 0;
    let newTotalPrice = 0;

    for (const dishName in dishesData) {
      const dish = dishesData[dishName];
      newTotalItems += dish.qty;
      newTotalPrice += dish.qty * dish.price;
    }

    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [dishesData]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar showNavbar={windowWidth < 768 ? "none" : ""} />
      {productsStatus === 'loading' || !sellerDetails ? (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      ) : (
        <>
          <SellerDetailsSection
            sellerDetails={sellerDetails}
            showCheckboxes={showCheckboxes}
            setShowCheckboxes={setShowCheckboxes}
          />
          <MealFilterContainer
            sellerDetails={sellerDetails}
          />
          <CartContainer
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
          <MealSubscription
            sellerDetails={sellerDetails}
            showCheckboxes={showCheckboxes}
            setShowCheckboxes={setShowCheckboxes}
          />
          <MeetTheMakers
            sellerDetails={sellerDetails}
          />
          <Footer />
        </>
      )}
    </>
  );
}

export default SellerPage;
