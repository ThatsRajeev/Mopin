export const fetchSellerCartInfo = (cart, sellerName, setdishInfo, setTotalItems, setTotalPrice) => {
  try {
    const newdishQty = {};
    let totalItemCount = 0;
    let totalPriceCount = 0;

    const currentSellerCart = cart.find(sellerGroup => sellerGroup.sellerName === sellerName);

    if (currentSellerCart) {
      currentSellerCart.items.forEach(item => {
        newdishQty[item.name] = parseInt(item.qty, 10);
        totalItemCount += parseInt(item.qty, 10) || 0;
        totalPriceCount += parseInt(item.qty, 10) * parseInt(item.price, 10) || 0;
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
          ? items.map(({ name, description, isVeg, price, qty, availability }) => {
              const dishQty = parseInt(qty, 10) || 0;
              totalItemCount += dishQty;
              totalPriceCount += dishQty * (parseInt(price, 10) || 0);

              return { name, description, isVeg, price, qty, availability };
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
