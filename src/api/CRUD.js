import axios from "axios";

// export const API_URL = "/users";

export const registerAPI = async (value) => {
  return (
    await axios.post(`${process.env.REACT_APP_URL}/register`, value),
    {
      header: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const loginAPI = async () => {};
export const updateProfileAPI = async (id, value) => {
  return await axios.delete(`${process.env.REACT_APP_URL}/update/${id}`, value);
};
export const changePasswordAPI = async () => {};
export const deleteProfileAPI = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_URL}/delete/${id}`);
};
