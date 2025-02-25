const rateLimit = require("express-rate-limit");
const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    countByCategory,
    countByStatus,
    countByCategoryAndStatus
  } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const taskLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit each user to 10 requests per windowMs
    message: { error: "Too many tasks created. Try again after 1 minute." },
  });
  

// ✅ Routes
router.post("/", authMiddleware, taskLimiter, createTask); // Create task
router.get("/", authMiddleware, getTasks); // Get all tasks
router.put("/:taskId", authMiddleware, updateTask); // Update task
router.delete("/:taskId", authMiddleware, deleteTask); // Delete task

router.get("/count-by-category", authMiddleware, countByCategory);
router.get("/count-by-status", authMiddleware, countByStatus);
router.get("/count-by-category-status", authMiddleware, countByCategoryAndStatus);


module.exports = router;





  

  
  



  
  







