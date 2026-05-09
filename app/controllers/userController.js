const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

class UserController {
  //crate admin
  async createUser(req, res, next) {
    try {
      const { name, email, password, phone, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let avatarUrl = "";

      if (req.file) {
        const result = await uploadToCloudinary(req.file);
        avatarUrl = result.secure_url;
      }

      //create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        avatar: avatarUrl,
        role,
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  //get all user
  async getAllUsers(req, res, next) {
    try {
      const users = await User.find({ isDeleted: false }).select("-password");

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  //get one user
  async getUserById(req, res, next) {
    try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user || user.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  //update a user
  async updateUser(req, res, next) {
    try {
      const { name, email, role } = req.body;

      const user = await User.findById(req.params.id);

      if (!user || user.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  //delete a user
  async deleteUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user || user.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.isDeleted = true;
      await user.save();

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  //change status
  async changeStatus(req, res, next) {
    try {
      const { status } = req.body;

      const user = await User.findById(req.params.id);

      if (!user || user.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.status = status;
      await user.save();

      res.status(200).json({
        success: true,
        message: "User status updated",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
