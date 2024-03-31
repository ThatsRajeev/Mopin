import axios from 'axios';

const sendFormData = async (formData) => {
  try {
    const response = await axios.post(process.env.REACT_APP_FORMSPREE_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Error sending form data to Formspree:', error);
    throw error;
  }
};

export default sendFormData;
