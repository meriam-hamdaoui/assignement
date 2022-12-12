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

    if (token)
      jwt.verify(token, SECRET_KEY, async (error, decoder) => {
        if (error) {
          return res.status(401).send({ message: "failed to authenticate" });
        }
        if (!decoder) {
          return res.json({ message: "user doesn't exist" });
        }

        fs.readFile("./db.json", (error, data) => {
          if (error) {
            const status = 401;
            const message = error;
            return res.status(status).json({ status, message });
          }

          data = JSON.parse(data.toString());

          const index = data.users.findIndex((el) => el.id === decoder.id);

          const user = JSON.stringify(data.users[index]);

          req.user = user;
          next();
        });
      });
  } catch (error) {
    console.error("authentication error =>", error);
    return res.status(500).json({ message: "authentication error" });
  }
};
