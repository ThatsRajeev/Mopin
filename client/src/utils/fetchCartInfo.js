export const fetchSellerCartInfo = (cart, sellerName, setdishInfo, setTotalItems, setTotalPrice) => {
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

    setdishInfo(newdishQty);
    setTotalItems(totalItemCount);
    setTotalPrice(totalPriceCount);
  } catch (error) {
    console.error('Error while processing cart information:', error);
  }
};

export const fetchFullCartInfo = async (cart, setdishInfo, setTotalItems, setTotalPrice) => {
  try {
    const newdishQty = [];
    let totalItemCount = 0;
    let totalPriceCount = 0;

    cart.forEach(({ sellerName, items, subs }) => {
      const sellerInfo = {
        sellerName,
        dishes: items
          ? items.map(({ dishName, dishDesc, dishIsVeg, dishPrice, dishQuantity }) => {
              const dishQty = parseInt(dishQuantity, 10) || 0;
              totalItemCount += dishQty;
              totalPriceCount += dishQty * (parseInt(dishPrice, 10) || 0);

              return { dishName, dishDesc, dishIsVeg, dishPrice, dishQty };
            })
          : [],
        subs: subs
          ? subs.map(({ selectedMeals, subsDays, subsPrice }) => {
              totalPriceCount += parseInt(subsPrice, 10) || 0;
              return { selectedMeals, subsDays, subsPrice };
            })
          : [],
      };

      newdishQty.push(sellerInfo);
    });

    setdishInfo(newdishQty);
    setTotalItems(totalItemCount);
    setTotalPrice(totalPriceCount);
  } catch (error) {
    console.error(error);
  }
};
