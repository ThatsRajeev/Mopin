import axios from "axios";

const fetchData = async (user) => {
  const storedData = localStorage.getItem("userData");
  if(storedData) {
    return JSON.parse(storedData)
  } else {
    try {
      const response = await axios.post('https://mopin-server.vercel.app/api/userdata', user);
      localStorage.setItem("userData", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchData;
