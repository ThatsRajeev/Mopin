import axios from "axios";

const fetchAddress = async (user) => {
  try {
    const response = await axios.post('https://mopin-server.vercel.app/api/addressdata', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchAddress;
