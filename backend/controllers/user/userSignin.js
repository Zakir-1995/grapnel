const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please Enter Your email");
    }
    if (!password) {
      throw new Error("Please Enter password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User no found!");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.JSON_SECRET_KEY, {
        expiresIn: "12h",
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).json({
        message: "Login Successfully!",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please Check Password!");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
