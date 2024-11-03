const jwt = require("jsonwebtoken");
async function authTokenController(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.json({
        message: "User Not Login!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.JSON_SECRET_KEY, function (err, decoded) {
      // console.log(err);
      // console.log("decoded", decoded);

      if (err) {
        console.log("Error Auth", err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authTokenController;
