const fetchCartInfo = (cart, sellerName, setdishQty, setTotalItems, setTotalPrice) => {
  try {
    const newdishQty = {};
    let totalItemCount = 0;
    let totalPriceCount = 0;

    const currentSellerCart = cart.find(sellerGroup => sellerGroup.sellerName === sellerName);

    if (currentSellerCart) {
      currentSellerCart.items.forEach(item => {
        newdishQty[item.dishName] = parseInt(item.dishQuantity, 10);
        totalItemCount += parseInt(item.dishQuantity, 10) || 0;
        totalPriceCount += parseInt(item.dishQuantity, 10) * parseInt(item.dishPrice, 10) || 0;
      });
    }

    setdishQty(newdishQty);
    setTotalItems(totalItemCount);
    setTotalPrice(totalPriceCount);
  } catch (error) {
    console.error('Error while processing cart information:', error);
  }
};

export default fetchCartInfo;
