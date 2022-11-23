const {
  registreUser,
  loginUser,
  changePwd,
  updateUser,
} = require("../controllers/user");

const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", registreUser);
userRouter.post("/login", loginUser);
userRouter.put("/update/:id", updateUser);
userRouter.put("/password/:id", changePwd);

module.exports = userRouter;
