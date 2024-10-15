const asyncHandler = require("express-async-handler");
const authQuery = require("../models/authQuery");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



// controller for normal Login

exports.postLocalLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(404).json({
      message: "empty fields submitted",
    });
  }

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
});


