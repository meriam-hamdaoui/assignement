const {
  registreUser,
  loginUser,
  changePwd,
  updateUser,
} = require("../controllers/user");

const userRouter = require("express").Router();

userRouter.post("/register", registreUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", updateUser);
userRouter.put("/password", changePwd);

module.exports = userRouter;
