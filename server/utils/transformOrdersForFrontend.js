async function transformOrdersForFrontend(orders) {
  const frontendOrders = {};

  for (const order of orders) {
    for (const itemsGroup of order.orderItems) {
      const dateKey = itemsGroup.deliveryDate.toISOString().slice(0, 10);
      const frontendDateObj = frontendOrders[dateKey] || {};

      for (const item of itemsGroup.items) {
        const sellerName = item.sellerName;
        const mealTime = item.mealTime;

        const frontendMealTimeObj = frontendDateObj[mealTime] || {};
        const frontendSellerObj = frontendMealTimeObj[sellerName] || { dish: null, customers: [], sellerTotal: 0 };

        if (!frontendSellerObj.dish) {
          const dishInfo = await getDishInfo(item.sellerName, item.dishName);
          frontendSellerObj.dish = dishInfo ? { dishName: dishInfo.dishName, price: dishInfo.price, quantity: item.quantity, status: item.status } : null;
        }
        // Add customers
        frontendSellerObj.customers.push({
          name: order.name,
          phoneNumber: order.phoneNumber,
          address: order.address,
          orderId: order.orderId
        });

        // Accumulate seller total
        frontendSellerObj.sellerTotal += item.quantity * (frontendSellerObj.dish ? frontendSellerObj.dish.price : 0);

        frontendMealTimeObj[sellerName] = frontendSellerObj;
        frontendDateObj[mealTime] = frontendMealTimeObj;
        frontendOrders[dateKey] = frontendDateObj;
      }
    }
  }
  return frontendOrders;
}

exports.transformOrdersForFrontend = transformOrdersForFrontend;
