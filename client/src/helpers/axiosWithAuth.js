import axios from 'axios';
import auth from './auth';

const axiosWithAuth = () => {
  const token = auth.get() || '';
  return axios.create({
    headers: {
      Authorization: token,
    }
  });
};

export default axiosWithAuth;
