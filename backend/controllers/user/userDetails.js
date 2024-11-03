const User = require("../../models/userModel");

async function userDetailsControllers(req, res) {
  try {
    const user = await User.findById(req.userId);

    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "user details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsControllers;
