const User = require("../../models/userModel");

async function deleteUserController(req, res) {
  const { _id } = req.body;
  try {
    await User.deleteOne({ _id: _id });
    return res.status(200).json({
      message: "User Deleted Successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteUserController;
