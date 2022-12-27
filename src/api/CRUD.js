import axios from "axios";

export const REACT_APP_URL = "http://localhost:5000";

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

export const getIconNumberAPI = async (token) => {
  const { data } = await axios.get(`${REACT_APP_URL}/api/icons/numbers`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
  return data;
};

export const getIconFollowerAPI = async (token) => {
  const { data } = await axios.get(`${REACT_APP_URL}/api/icons/followers`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
  return data;
};

export const uploadNbrIcon = async (id, icon, token) => {
  const { data } = await axios.put(
    `${REACT_APP_URL}/api/icons/numbers/${id}`,
    icon,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return data;
};
export const uploadFlwIcon = async (id, icon, token) => {
  const { data } = await axios.put(
    `${REACT_APP_URL}/api/icons/followers/${id}`,
    icon,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return data;
};
