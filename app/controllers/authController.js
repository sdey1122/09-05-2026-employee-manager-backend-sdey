const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const generateToken = require("../utils/generateToken");

class AuthController {
  //register
  async register(req, res, next) {
    try {
      const { name, email, password, phone, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Name, email and password are required",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      let avatarUrl = "";
      if (req.file) {
        const result = await uploadToCloudinary(req.file);
        avatarUrl = result.secure_url;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userRole = role || "employee";
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        avatar: avatarUrl,
        role: userRole,
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  //login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user || user.isDeleted) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      if (user.status === "inactive") {
        return res.status(403).json({
          success: false,
          message: "Account is inactive. Contact admin.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const token = generateToken(user);

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  //logout
  async logout(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
