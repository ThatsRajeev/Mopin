import axios from "axios";

const handleGPS = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `https://mopin-server.vercel.app/proxy/geocode/v1/json?q=${latitude}+${longitude}&key=12b6daa5213d46898ef052dfacf9ac5a`,
          { withCredentials: false }
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default handleGPS;
