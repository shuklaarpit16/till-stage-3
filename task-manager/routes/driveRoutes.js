const express = require("express");
const router = express.Router();
const { createFolder, uploadFile, getFolderContents, deleteFolder } = require("../controllers/driveController");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user authentication
const upload = require("../middleware/multerConfig"); // ✅ Correct way


router.post("/create-folder", authMiddleware, createFolder);
router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/folder/:folderId?", authMiddleware, getFolderContents);
router.delete("/folder/:folderId", authMiddleware, deleteFolder);

module.exports = router;

