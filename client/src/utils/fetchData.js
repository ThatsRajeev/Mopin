import axios from "axios";

const fetchData = async (user) => {
  try {
    const response = await axios.post('https://mopin-server.vercel.app/api/userdata', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
