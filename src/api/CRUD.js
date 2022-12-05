import axios from "axios";

export const REACT_APP_URL = "http://localhost:5000";

export const fetchUserAPI = async () => {
  const { data } = await axios.get(`${REACT_APP_URL}/users`);

  return data;
};

export const registerAPI = async (value) => {
  const response = await axios.post(
    `${REACT_APP_URL}/api/auth/register`,
    { ...value },
    {
      header: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const loginAPI = async (value) => {
  const response = await axios.post(`${REACT_APP_URL}/api/auth/login`, value, {
    header: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getUserAPI = async (id) => {
  const { data } = await axios.get(`${REACT_APP_URL}/api/users/${id}`);
  return data;
};

export const updateProfileAPI = async (id, value) => {
  return await axios.put(`${REACT_APP_URL}/api/users/update/${id}`, value);
};
export const changePasswordAPI = async () => {};
export const deleteProfileAPI = async (id) => {
  return await axios.delete(`${REACT_APP_URL}/users/${id}`);
};
