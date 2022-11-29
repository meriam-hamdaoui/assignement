import axios from "axios";

export const REACT_APP_URL = "http://localhost:5000";

export const fetchUserAPI = async () => {
  const { data } = await axios.get(`${REACT_APP_URL}/users`);

  return data;
};

export const registerAPI = async (value) => {
  const response = await axios.post(
    `${REACT_APP_URL}/users`,
    { ...value },
    {
      header: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export const loginAPI = async () => {};
export const updateProfileAPI = async (id, value) => {
  return await axios.delete(`${REACT_APP_URL}/users/${id}`, value);
};
export const changePasswordAPI = async () => {};
export const deleteProfileAPI = async (id) => {
  return await axios.delete(`${REACT_APP_URL}/users/${id}`);
};
