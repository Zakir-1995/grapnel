const User = require("../../models/userModel");


async function updateUser(req, res) {
  try {
    const { email, name, role, userId } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const userUpdated = await User.findByIdAndUpdate(userId, payload);

    return res.json({
      data: userUpdated,
      message: "User Updated",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
