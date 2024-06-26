import axios from "axios";

const fetchAddress = async (user) => {
  const storedAddress = localStorage.getItem("savedAddress");
  if(storedAddress) {
    return JSON.parse(storedAddress)
  } else {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/addresses/${user.phoneNumber}`);
      localStorage.setItem("savedAddress", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchAddress;
