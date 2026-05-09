const Task = require("../models/Task");

class TaskController {
  //create tasks
  async createTask(req, res, next) {
    try {
      const { title, description, assignedTo, priority, dueDate } = req.body;

      const task = await Task.create({
        title,
        description,
        assignedBy: req.user._id,
        assignedTo,
        priority,
        dueDate,
      });

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  //get all tasks
  async getAllTasks(req, res, next) {
    try {
      let tasks;

      if (req.user.role === "admin") {
        tasks = await Task.find({ isDeleted: false })
          .populate("assignedBy", "name email")
          .populate("assignedTo", "name email");
      } else if (req.user.role === "manager") {
        tasks = await Task.find({
          assignedBy: req.user._id,
          isDeleted: false,
        }).populate("assignedTo", "name email");
      } else {
        tasks = await Task.find({
          assignedTo: req.user._id,
          isDeleted: false,
        }).populate("assignedBy", "name email");
      }

      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  //get one task
  async getTaskById(req, res, next) {
    try {
      const task = await Task.findById(req.params.id)
        .populate("assignedBy", "name email")
        .populate("assignedTo", "name email");

      if (!task || task.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  //update a task
  async updateTask(req, res, next) {
    try {
      const { title, description, priority, dueDate } = req.body;

      const task = await Task.findById(req.params.id);

      if (!task || task.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.priority = priority || task.priority;
      task.dueDate = dueDate || task.dueDate;

      await task.save();

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  //change task status
  async changeTaskStatus(req, res, next) {
    try {
      const { status } = req.body;

      const task = await Task.findById(req.params.id);

      if (!task || task.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      task.status = status;
      await task.save();

      res.status(200).json({
        success: true,
        message: "Task status updated",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  //assign a task
  async assignTask(req, res, next) {
    try {
      const { assignedTo } = req.body;

      const task = await Task.findById(req.params.id);

      if (!task || task.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      task.assignedTo = assignedTo;
      await task.save();

      res.status(200).json({
        success: true,
        message: "Task reassigned successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  //delete a task
  async deleteTask(req, res, next) {
    try {
      const task = await Task.findById(req.params.id);

      if (!task || task.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      task.isDeleted = true;
      await task.save();

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
