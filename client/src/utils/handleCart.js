const handleCart = (sellerName, dish, qty) => {
  const cartItem = {
    name: dish.name,
    price: dish.price,
    description: dish.description,
    isVeg: dish.isVeg,
    qty: qty,
    availability: dish.availability,
  };

  let existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingSellerIndex = existingCart.findIndex(group => group.sellerName === sellerName);

  if (existingSellerIndex !== -1) {
    const existingItem = existingCart[existingSellerIndex].items.find(item => item.name === dish.name);

    if (existingItem) {
      existingItem.qty += qty;

      if (existingItem.qty === 0) {
        existingCart[existingSellerIndex].items = existingCart[existingSellerIndex].items.filter(item => item.name !== dish.name);
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
