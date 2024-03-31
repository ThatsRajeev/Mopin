async function getDishInfo(sellerName, dishName) {
    try {
        const seller = await Seller.findOne({ name: sellerName });

        if (!seller) {
            return null;
        }

        const dish = seller.dishes.find(d => d.name === dishName);

        return dish ? { dishName: dish.name, price: dish.price } : null;

    } catch (err) {
        console.error('Error fetching dish info: ', err);
        throw err;
    }
}

exports.getDishInfo = getDishInfo;
