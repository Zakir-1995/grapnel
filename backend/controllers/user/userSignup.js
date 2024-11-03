const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignupController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User Already Exists");
    }
    if (!email) {
      throw new Error("Please Enter Your email");
    }
    if (!password) {
      throw new Error("Please Enter password");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("Something Went Wrong");
    }
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };
    const userData = new User(payload);
    const saveData = await userData.save();

    res.status(201).json({
      data: saveData,
      success: true,
      error: false,
      message: "User Created Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignupController;
