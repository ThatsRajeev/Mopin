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
    const encodedPhoneNumber = encodeURIComponent(user.phoneNumber);
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userdata/${encodedPhoneNumber}`);
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
