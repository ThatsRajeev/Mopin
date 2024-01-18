const handleCart = (sellerName, name, price, desc, isVeg, qty) => {
  const cartItem = {
    dishName: name,
    dishPrice: price,
    dishDesc: desc,
    dishIsVeg: isVeg,
    dishQuantity: qty
  };

  let existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingSellerIndex = existingCart.findIndex(group => group.sellerName === sellerName);

  if (existingSellerIndex !== -1) {
    const existingItemIndex = existingCart[existingSellerIndex].items.findIndex(item => item.dishName === name);

    if (existingItemIndex !== -1) {
      existingCart[existingSellerIndex].items[existingItemIndex].dishQuantity = qty;

      if (qty === 0) {
        existingCart[existingSellerIndex].items.splice(existingItemIndex, 1);
      }
    } else {
      existingCart[existingSellerIndex].items.push(cartItem);
    }

    if (existingCart[existingSellerIndex].items.length === 0) {
      existingCart.splice(existingSellerIndex, 1);
    }
  } else {
    existingCart.push({
      sellerName: sellerName,
      items: [cartItem],
      subs: [],
    });
  }

  localStorage.setItem('cart', JSON.stringify(existingCart));
};

export default handleCart;
