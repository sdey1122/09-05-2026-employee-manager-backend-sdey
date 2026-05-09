const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      //check if user exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized",
        });
      }

      //check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
};

module.exports = authorizeRoles;
