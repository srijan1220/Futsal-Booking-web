const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  //  get header authorization

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorization header not found!",
    });
  }

  // get token by splitting the header
  // format - "bearer tokenxy"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Token not found",
    });
  }
  try {
    // verify token
    const decodeUSer = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUSer;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const authGuardAdmin = (req, res, next) => {
  //  get header authorization

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorization header not found!",
    });
  }

  // get token by splitting the header
  // format - "bearer tokenxy"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Token not found",
    });
  }
  try {
    // verify token
    const decodeUSer = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUSer;
    if (!req.user.isAdmin) {
      return res.json({
        success: false,
        message: "Permission Denied",
      });
    }

    // check if user is admin or not
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = {
    authGuard,
    authGuardAdmin,
}
