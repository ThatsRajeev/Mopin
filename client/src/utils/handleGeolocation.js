import axios from "axios";

const handleGeolocation = async (options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (options.lat && options.lng) {
        // Reverse Geocoding: Use provided latitude and longitude
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${options.lat}&lon=${options.lng}&format=json`,
          { withCredentials: false }
        );
        resolve(response.data);

      } else if (navigator.geolocation) {
        // GPS-based Reverse Geocoding
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              { withCredentials: false }
            );
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by your browser."));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default handleGeolocation;
