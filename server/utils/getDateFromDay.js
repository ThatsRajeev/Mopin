function getDateFromDay(targetDay) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentDay = days[today.getDay()];

  const targetDate = (currentDay === targetDay) ? today : new Date(today.getTime() + ((days.indexOf(targetDay) - days.indexOf(currentDay) + 7) % 7) * 24 * 60 * 60 * 1000);

  return targetDate;
}

export default getDateFromDay;
