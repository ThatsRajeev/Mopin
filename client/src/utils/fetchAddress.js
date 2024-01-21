import axios from "axios";

const fetchAddress = async (user) => {
  const storedAddress = localStorage.getItem("savedAddress");
  if(storedAddress) {
    return JSON.parse(storedAddress)
  } else {
    try {
      const response = await axios.post('https://mopin-server.vercel.app/api/addressdata', user);
      localStorage.setItem("savedAddress", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchAddress;
