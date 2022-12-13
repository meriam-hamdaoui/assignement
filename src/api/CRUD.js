import axios from "axios";

const REACT_APP_URL = "http://localhost:5000";

export const fetchUsersAPI = async () => {
  const { data } = await axios.get(`${REACT_APP_URL}/api/users`);

  return data;
};

// create account
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

// signin
export const loginAPI = async (value) => {
  const response = await axios.post(`${REACT_APP_URL}/api/auth/login`, value, {
    header: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// display profile
export const getUserAPI = async (id, token) => {
  const { data } = await axios.get(`${REACT_APP_URL}/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return data;
};

// update user data
export const updateProfileAPI = async (id, value, token) => {
  await axios.put(`${REACT_APP_URL}/api/users/update/${id}`, value, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

// modify password
export const changePasswordAPI = async (id, value, token) => {
  await axios.put(`${REACT_APP_URL}/api/users/password/${id}`, value, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

// forget password
export const passwordForgotenAPI = async (value) => {
  await axios.put(`${REACT_APP_URL}/api/users/forget_password`, value, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// delete profile
export const deleteProfileAPI = async (id) => {
  await axios.delete(`${REACT_APP_URL}/api/auth/delete/${id}`);
};
