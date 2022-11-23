const {
  registreUser,
  loginUser,
  changePwd,
  updateUser,
} = require("../controllers/user");
const {
  userValidator,
  pwdValidator,
  validation,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/isAuth");

const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", userValidator, validation, registreUser);
userRouter.post("/login", loginUser);
userRouter.put("/update/:id", isAuth, updateUser);
userRouter.put("/password/:id", isAuth, pwdValidator, validation, changePwd);

module.exports = userRouter;
