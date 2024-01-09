import axios from "axios";

const handleGPS = async (props) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${props.lat}&lon=${props.lng}&format=json`,
        { withCredentials: false }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

export default handleGPS;
