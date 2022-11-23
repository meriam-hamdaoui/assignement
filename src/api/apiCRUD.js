import axios from "axios";

const configuration = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createAccountApi = async (value) => {
  const reponse = await axios.post(
    `${process.env.REACT_APP_URL}/api/user/register`,
    { ...value },
    {
      configuration,
    }
  );
  return reponse;
};

export const loginApi = async (value) => {
  const reponse = await axios.post(
    `${process.env.REACT_APP_URL}/api/user/login`,
    value,
    { configuration }
  );
};
