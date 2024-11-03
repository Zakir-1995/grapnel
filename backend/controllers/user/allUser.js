const User = require("../../models/userModel");

async function allUser(req, res) {
  try {
    const allUser = await User.find()
    res.status(200).json({
      data: allUser,
      success: true,
      error: false
   })
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUser;
