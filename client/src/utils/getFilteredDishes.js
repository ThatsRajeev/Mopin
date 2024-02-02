export function getFilteredDishes(activeSwitch, setActiveCategory, daysInOrder, homecooks) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getDayOfTheWeek = (offset) => {
    const today = new Date();
    today.setDate((today.getDate() + offset) % 7);
    return days[today.getDay()];
  };

  const getSortOrder = (dish) => [...Array(7).keys()].find(i => dish.availability.some(avail => avail.day === getDayOfTheWeek(i)));

  const sortedDishes = Object.values(homecooks[0].dishes).flat().sort((dishA, dishB) => getSortOrder(dishA) - getSortOrder(dishB));

  const sortedAndGroupedDishes = daysInOrder.map(day => ({
    day,
    dishes: sortedDishes.filter(dish => dish.availability.some(avail => avail.day === day)),
  }));

  const filteredDishes = sortedAndGroupedDishes.map(({ day, dishes }) => ({
    day,
    dishes: dishes.filter(dish => (activeSwitch === "All") || (activeSwitch === "Veg" ? dish.isVeg : !dish.isVeg)),
  }));

  return filteredDishes;
}

export function getDayOfTheWeek(offset) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  today.setDate((today.getDate() + offset) % 7);
  return days[today.getDay()];
}

export function getDateFromDay(targetDay) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentDay = days[today.getDay()];

  const targetDate = (currentDay === targetDay) ? today : new Date(today.getTime() + ((days.indexOf(targetDay) - days.indexOf(currentDay) + 7) % 7) * 24 * 60 * 60 * 1000);
  const formattedDate = targetDate.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' });

  return formattedDate;
}
