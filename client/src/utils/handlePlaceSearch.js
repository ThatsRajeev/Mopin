import axios from "axios";

const handlePlaceSearch = async (query) => {
    const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&countrycodes=in`,
        { withCredentials: false }
    );
    return response.data;
};

export default handlePlaceSearch;
