const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, taskController.createTask);
router.get("/count-by-category", authMiddleware, taskController.countByCategory);
router.get("/count-by-status", authMiddleware, taskController.countByStatus);
router.get("/count-by-category-status", authMiddleware, taskController.countByCategoryAndStatus);

module.exports = router;




  

  
  



  
  







