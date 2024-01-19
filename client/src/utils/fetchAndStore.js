const fetchAndStore = async (user, key, fetchFunction, dataSetter) => {
  const getUserDataFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };

  const storedData = getUserDataFromLocalStorage(key);
  if (storedData) {
    dataSetter(storedData);
  } else {
    try {
      const res = await fetchFunction(user);
      dataSetter(res);

      localStorage.setItem(key, JSON.stringify(res));
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchAndStore;
