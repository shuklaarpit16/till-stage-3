const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["ToDo", "In-Progress", "Done"],
    default: "ToDo",
  },
  category: {
    type: String,
    enum: ["Study", "Sports", "Leisure", "Food", "Entertainment"],
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);



