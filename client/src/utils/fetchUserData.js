import axios from "axios";
const SEVEN_DAYS_IN_MS = 604800000;

const fetchUserData = async (user) => {
  const storedData = localStorage.getItem("userData");

  if (storedData) {
    const { data, timestamp } = JSON.parse(storedData);
    if (Date.now() - timestamp <= SEVEN_DAYS_IN_MS) {
      return data;
    } else {
      localStorage.removeItem("userData");
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${user.phoneNumber}`);
    localStorage.setItem("userData", JSON.stringify({
      data: response.data,
      timestamp: Date.now()
    }));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchUserData;
