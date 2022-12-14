const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const bcrypt = require("bcryptjs");
const cors = require("cors");

// third partie
const { isAuthenticated } = require("./helpers");
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  resetPassword,
  deleteAccount,
} = require("./controllers");

const server = jsonServer.create();

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(jsonServer.defaults());
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const salt = bcrypt.genSaltSync(10);

// get all users
server.get("/api/users", (req, res) => {
  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    data = JSON.parse(data.toString());

    return res.status(200).json(data.users);
  });
});

// create account
server.post("/api/auth/register", register);

// signin
server.post("/api/auth/login", login);

// display profile
server.get("/api/users/:id", isAuthenticated, getProfile);

// update user data
server.put("/api/users/update/:id", isAuthenticated, updateProfile);

// modify password
server.put("/api/users/password/:id", isAuthenticated, changePassword);

// password forgoten
server.put("/api/users/forget_password", resetPassword);

// delete account
server.delete("/api/auth/delete/:id", isAuthenticated, deleteAccount);

const PORT = 5000 || 5005;

server.listen(PORT, () => {
  console.log(`go to http://localhost:${PORT}`);
});
