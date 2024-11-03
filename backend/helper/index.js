const User = require("../models/userModel");

const uploadProductPermission = async () => {
  const user = await User.findOne();

  if (!user.role === "ADMIN") {
    return true;
  }

  return false;
};

module.exports = uploadProductPermission;
