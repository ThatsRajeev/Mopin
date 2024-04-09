const { Order } = require('../model/Order');
const { getDateFromDay } = require('../utils/getDateFromDay');
const { getDishInfo } = require('../utils/getDishInfo');
const { transformOrdersForFrontend } = require('../utils/transformOrdersForFrontend');

exports.createOrder = async (req, res) => {
  try {
    const { name, number, address, dishes } = req.body.orderData;
    const newOrder = new Order({
      orderId: req.body.orderId,
      name,
      phoneNumber: number,
      address,
      orderItems: [],
      totalAmount: 0,
      paymentStatus: "Pending",
    });

    for (const sellerDishes of Object.values(dishes)) {
      for (const dish of Object.values(sellerDishes)) {
        const deliveryDate = getDateFromDay(dish.availability[0].day);
        const dishInfo = await getDishInfo(seller, dish.name);
        const itemGroup = newOrder.orderItems.find(group => group.deliveryDate.toISOString().slice(0,10) === deliveryDate.toISOString().slice(0,10));

        const newItem = {
          sellerName: seller,
          dishName: dish.name,
          quantity: dish.qty,
          mealTime: dish.availability[0].meal,
          price: parseInt(dishInfo.price),
          status: "Pending",
        };

        if (itemGroup) {
          itemGroup.items.push(newItem);
        } else {
          newOrder.orderItems.push({
            deliveryDate,
            items: [newItem]
          });
        }
        newOrder.totalAmount += dish.qty * parseInt(dishInfo.price);
      }
    }

    const doc = await newOrder.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: "SUCCESS" }).populate({
      path: 'items.sellerName',
      strictPopulate: false
  });

    const transformedOrders = await transformOrdersForFrontend(orders);
    console.log(transformedOrders);
    res.status(201).json(transformedOrders);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchOrderByNumber = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const orders = await Order.find({ phoneNumber: {$eq: phoneNumber} });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const { orderId, sellerName, dishName, paymentStatus } = req.body;

    const updateResult = await Order.updateOne(
      {
        orderId: orderId,
        "orderItems.items": {
          $elemMatch: {
            dishName: dishName,
            sellerName: sellerName
          }
        }
      },
      {
        $set: { "orderItems.$[order].items.$[item].status": paymentStatus }
      },
      {
        arrayFilters: [
          { "order.items.dishName": dishName, "order.items.sellerName": sellerName },
          { "item.dishName": dishName }
        ]
      }
    );

    if (updateResult.nModified === 0) {
      res.status(400).json({ message: "No documents were modified" });
    } else {
      res.status(200).json({ message: 'Dish status updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
