const { Order } = require('../model/Order');
const { getDateFromDay } = require('../utils/getDateFromDay');
const { getDishInfo } = require('../utils/getDishInfo');
const { transformOrdersForFrontend } = require('../utils/transformOrdersForFrontend');

const today = new Date();
today.setHours(0, 0, 0, 0);

exports.createOrder = async (req, res) => {
  try {
    const { name, number, address, dishes, subscriptions } = req.body.orderData;
    const newOrder = new Order({
      orderId: req.body.orderId,
      name: name,
      phoneNumber: number,
      address,
      orderItems: [],
      totalAmount: 0,
      paymentStatus: "Pending",
      createdAt: new Date(),
      updatedAt: null,
    });

    for (const [seller, sellerDishes] of Object.entries(dishes)) {
      for (const [dishName, dish] of Object.entries(sellerDishes)) {
        const deliveryDate = getDateFromDay(dish.availability[0].day);
        const itemGroup = newOrder.orderItems.find(group => group.deliveryDate.toISOString().slice(0,10) === deliveryDate.toISOString().slice(0,10));

        const dishInfo = await getDishInfo(seller, dish.name);

        if (itemGroup) {
          itemGroup.items.push({
            sellerName: seller,
            dishName: dish.name,
            quantity: dish.qty,
            mealTime: dish.availability[0].meal,
            price: parseInt(dishInfo.price),
            status: "Pending",
          });
        } else {
          newOrder.orderItems.push({
            deliveryDate,
            items: [{
              sellerName: seller,
              dishName: dish.name,
              quantity: dish.qty,
              mealTime: dish.availability[0].meal,
              price: parseInt(dishInfo.price),
              status: "Pending",
            }]
          });
        }
        newOrder.totalAmount += dish.qty * parseInt(dishInfo.price);
      }
    }

    const doc = await newOrder.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.findOne({ paymentStatus: "SUCCESS" }).populate({
      path: 'items.sellerName',
      strictPopulate: false
  });

    const transformedOrders = await transformOrdersForFrontend(orders);
    res.status(201).json(transformedOrders);
  } catch (err) {
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
    const { orderId, sellerName, dishName, status } = req.body;

    const updateResult = await Order.updateOne(
    {
      orderId: orderId,
      "orderItems": {
        $elemMatch: { // Target a 'deliveryDate' subdocument
          "items": { // Filter within the nested 'items'
            $elemMatch: {
              dishName: dishName,
              sellerName: sellerName
            }
          }
        }
      }
    },
    {
      $set: { "orderItems.$[outer].items.$[inner].status": status }
    }
  );

      if (updateResult.matchedCount === 0) {
       res.status(404).json({ message: "Order or dish not found" });
     } else if (updateResult.modifiedCount === 0) {
       res.status(400).json({ message: "Status was already the same" });
     } else {
       res.status(200).json({ message: 'Dish status updated successfully' });
     }
  } catch (err) {
    res.status(400).json(err);
  }
};
