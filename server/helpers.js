const fs = require("fs");
const jwt = require("jsonwebtoken");
const userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

const SECRET_KEY = "72676376";
const expiresIn = "1h";

// create token
exports.createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// sign up
exports.isRegistered = ({ email }) => {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (token) {
      let decoder = jwt.verify(token, SECRET_KEY);

      if (!decoder) {
        return res.status(404).json("user doesn't exist");
      }

      const user = await userdb.users.find((el) => el.id === decoder.id);

      req.user = user;

      next();
    }
    if (!token) {
      return res.status(404).json({ message: "failed to authenticate" });
    }
  } catch (error) {
    console.error("authentication error =>", error);
    return res.status(500).json({ message: "authentication error" });
  }
};
