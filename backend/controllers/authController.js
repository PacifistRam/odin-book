const asyncHandler = require("express-async-handler");
const authQuery = require("../models/authQuery");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// controller for normal Login

exports.postLocalLogin = [
  body("email")
  .trim()
  .notEmpty()
  .withMessage("Email can't be empty")
  .isEmail()
  .withMessage("needs to be valid email"),
  // .normalizeEmail(), // commented for testing 

  body("password")
  .trim()
  .notEmpty()
  .withMessage("password can't be empty")
  .isLength({ min: 6})
  .withMessage("password need to be at least 6 chars long")
  .isLength({ max: 15})
  .withMessage("password is too long "),
  // .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/)

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(404).json({
        message: "invalid fields submitted",
        error: errorMsgArray
      });
    }
    const { email, password } = req.body;
    console.log("email: ", email)
    const result = await authQuery.getUserByEmail(email);
    if (result.data) {
      // const match = await bcrypt.compare(password, result.data.password);
      const match = (await password) === result.data.password;
      if (match) {
        const user = result.data;
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          message: "authentication successful",
          token,
        });
      } else {
        return res.status(401).json({
          message: "incorrect credential",
        });
      }
    }
    return res.status(404).json({
      message: result.message,
      error: result.error,
    });
  }),
];
