export function getFilteredDishes(activeSwitch, setActiveCategory, daysInOrder, homecooks) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getDayOfTheWeek = (offset) => {
    const today = new Date();
    today.setDate((today.getDate() + offset) % 7);
    return days[today.getDay()];
  };

  const getSortOrder = (dish) => {
    for (let i = 0; i < 7; i++) {
      if (dish.availability.some(avail => avail.day === getDayOfTheWeek(i))) {
        return i;
      }
    }
  };

  const sortedDishes = Object.keys(homecooks[0].dishes)
    .map((dishCategory) => homecooks[0].dishes[dishCategory])
    .flat()
    .sort((dishA, dishB) => getSortOrder(dishA) - getSortOrder(dishB));

  const sortedAndGroupedDishes = daysInOrder.map(day => {
    const dayDishes = sortedDishes.filter(dish => dish.availability.some(avail => avail.day === day));

    return {
      day,
      dishes: dayDishes,
    };
  });

  const filteredDishes = sortedAndGroupedDishes.map(({ day, dishes }) => {
    const filteredDishes = dishes.filter((dish) => {
      if (activeSwitch === "All") {
        return true;
      } else if (activeSwitch === "Veg") {
        return dish.isVeg;
      } else if (activeSwitch === "Non Veg") {
        return !dish.isVeg;
      }
      return true;
    });

    return {
      day,
      dishes: filteredDishes,
    };
  });

  return filteredDishes;
}

export function getDayOfTheWeek(offset) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  today.setDate((today.getDate() + offset) % 7);
  return days[today.getDay()];
}
