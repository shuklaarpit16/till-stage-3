const Task = require("../models/Task");

// ✅ Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, category } = req.body;
    const userId = req.user.id; // Get user from token

    const task = new Task({ title, description, status, category, user: userId });
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get task count by category
exports.countByCategory = async (req, res) => {
  try {
    const categories = ["Study", "Sports", "Leisure", "Food", "Entertainment"];
    const counts = await Task.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const result = categories.reduce((acc, category) => {
      acc[category] = 0; // Default count = 0
      return acc;
    }, {});

    counts.forEach(({ _id, count }) => {
      result[_id] = count;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get task count by status
exports.countByStatus = async (req, res) => {
  try {
    const statuses = ["ToDo", "In-Progress", "Done"];
    const counts = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const result = statuses.reduce((acc, status) => {
      acc[status] = 0; // Default count = 0
      return acc;
    }, {});

    counts.forEach(({ _id, count }) => {
      result[_id] = count;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get task count by both category & status
exports.countByCategoryAndStatus = async (req, res) => {
  try {
    const categories = ["Study", "Sports", "Leisure", "Food", "Entertainment"];
    const statuses = ["ToDo", "In-Progress", "Done"];

    const counts = await Task.aggregate([
      { $group: { _id: { category: "$category", status: "$status" }, count: { $sum: 1 } } }
    ]);

    const result = {};
    categories.forEach((category) => {
      result[category] = {};
      statuses.forEach((status) => {
        result[category][status] = 0; // Default count = 0
      });
    });

    counts.forEach(({ _id, count }) => {
      result[_id.category][_id.status] = count;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};




