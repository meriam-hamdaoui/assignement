import axios from "axios";

const REACT_APP_URL = "http://localhost:5000";

export const fetchUsersAPI = async () => {
  const { data } = await axios.get(`${REACT_APP_URL}/api/users`);

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

export const getUserAPI = async (id, token) => {
  const { data } = await axios.get(`${REACT_APP_URL}/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return data;
};

export const updateProfileAPI = async (id, value, token) => {
  await axios.put(`${REACT_APP_URL}/api/users/update/${id}`, value, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const changePasswordAPI = async (id, value, token) => {
  return await axios.put(`${REACT_APP_URL}/api/users/password/${id}`, value, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const passwordForgoten = async (value) => {
  return await axios.put(`${REACT_APP_URL}/api/users/forget_password`, value, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProfileAPI = async (id) => {
  return await axios.delete(`${REACT_APP_URL}/users/${id}`);
};
