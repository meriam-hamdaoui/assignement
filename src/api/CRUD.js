import axios from "axios";

// export const API_URL = "/users";

export const fetchUserAPI = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_URL}/users`);

  return data;
};

export const registerAPI = async (value) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/users`,
    value,
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
  return await axios.delete(`${process.env.REACT_APP_URL}/users/${id}`, value);
};
export const changePasswordAPI = async () => {};
export const deleteProfileAPI = async (id) => {
  return await axios.delete(
    `${process.env.REACT_APP_URL}/api/auth/delete/${id}`
  );
};
