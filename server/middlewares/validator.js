let { check, validationResult } = require("express-validator");

exports.userValidator = [
  check("firstName")
    .notEmpty()
    .isString()
    .withMessage("please enter your first name"),
  check("lastName")
    .notEmpty()
    .isString()
    .withMessage("please enter your last name"),
  //email validation
  // check("user.email", "the email field is required").isString().notEmpty(),
  check("email")
    .notEmpty()
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("please enter a valid email"),
  //password
  check("password")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must have 8 characters minimum"),
];

exports.validation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errMsg: " validation errors", errors: errors.array() });

  next();
};

exports.pwdValidator = [
  check("password")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must have 8 characters minimum"),
];
