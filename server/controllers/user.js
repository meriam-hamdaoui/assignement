const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

// create account
exports.registreUser = async (req, res) => {
  try {
    // retrieve the query
    const { email } = req.body;

    // verify the existance of the user
    const exists = await User.findOne({ email: email });
    // console.log("exists", exists);

    if (exists)
      return res.status(400).json({ msgErr: "this email already exists" });

    //   if it doesn't exist create a new user
    const newUser = new User({
      ...req.body,
      email: email.toLowerCase().trim(),
    });

    // hashage of the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);

    newUser.password = hash;

    // create new user
    await newUser
      .save()
      .then(async (response) => {
        if (response)
          return res.status(200).json({
            sucsMsg: "user registred avec succsess",
            user: response,
          });
      })
      .catch((error) => {
        if (error)
          return res.status(400).json({
            msgErr: "OPS!! somthing went wrong while registering the new user",
            err: error,
          });
      });
  } catch (error) {
    console.error("registre User controller catch error", error);
    return res
      .status(500)
      .json({ msgErr: "registreUser controller catch error", err: error });
  }
};

// login to account
exports.loginUser = async (req, res) => {
  try {
    // verify if there is a user with this email
    let { email } = req.body;
    email = email.toLowerCase().trim();
    const user = await User.findOne({ email: email });
    // console.log("user", user);

    // if no user
    if (!user)
      return res
        .status(404)
        .json({ msgErr: "there is no user with this email and password" });

    // if there is a user
    await bcrypt.compare(req.body.password, user.password).then((matchs) => {
      // if no
      if (!matchs)
        return res.status(403).json({ msgErr: "password incorrect" });

      // if yes
      const payload = { id: user._id };
      jwt.sign(payload, process.env.secretOrKey, (error, token) => {
        if (error)
          return res.status(error.status).json({ msgErr: "token invalid" });

        if (token) {
          const profile = user;
          return res.status(200).json({
            sucsMsg: `welcome on borard ${profile.firstName}`,
            profile: user,
            token: token,
          });
        }
      });
    });
  } catch (error) {
    console.error("login User controller catch error", error);
    return res
      .status(500)
      .json({ msgErr: "loginUser controller catch error", err: error });
  }
};

// update profile
exports.updateUser = async (req, res) => {
  try {
    // extract the id
    const { id } = req.params;

    // extract the body request
    let { firstName, lastName, phone, country } = req.body;

    await User.findByIdAndUpdate(
      id,
      { $set: { firstName, lastName, phone, country } },
      { new: true }
    )
      .then(async (user) => {
        if (user)
          return res
            .status(200)
            .json({ sucsMsg: "user updated with success", user: user });
      })
      .catch((error) => {
        if (error)
          return res.status(error.status).json({
            msgErr: "Oups!! something went wrong while profile updating",
            error: error,
          });
      });
  } catch (error) {
    console.error("updateUser controller catch error", error);
    return res
      .status(500)
      .json({ msgErr: "updateUser controller catch error", err: error });
  }
};

// change password
exports.changePwd = async (req, res) => {
  try {
    const { id } = req.params;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hash;

    const newPassword = req.body.password;

    const pwdChanged = await User.findByIdAndUpdate(
      id,
      { $set: { password: newPassword } },
      { new: true }
    );
    return res
      .status(200)
      .json({ sucsMsg: "password changed succesfuly", pwdChanged });
  } catch (error) {
    console.error("changePwd controller catch error", error);
    return res
      .status(500)
      .json({ msgErr: "changePwd controller catch error", err: error });
  }
};
