const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    // we need to get the header of our req to see if our user has a token
    const token = req.header("authentication");
    // console.log("isAuth token", token);

    if (token) {
      return jwt.verify(
        token,
        process.env.secretOrKey,
        async (error, decoder) => {
          if (error) {
            return res
              .status(401)
              .json({ errMsg: "Failed to authenticate token." });
          }
          if (!decoder)
            return res
              .status(404)
              .json({ errMsg: "no such user, sign up first" });

          const user = await User.findById(decoder.id);

          req.user = user;

          return next();
        }
      );
    }
    // if there is no token
    if (!token)
      return res
        .status(401)
        .json({ errMsg: "you are not authorized to perceed" });
  } catch (error) {
    console.error("authentication error =>", error);
    return res.status(500).json({ errMsg: "authentication error" });
  }
};
