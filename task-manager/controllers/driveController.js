const Folder = require("../models/Folder");
const File = require("../models/File");
const multer = require("multer");
const path = require("path");

// 📌 Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 📌 Create a new folder
const createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;
    const folder = new Folder({
      name,
      parentFolder: parentFolder || null,
      createdBy: req.user.id, // User ID from authentication
    });
    await folder.save();
    res.status(201).json({ message: "Folder created successfully", folder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Upload a file to a folder
const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const parentFolder = req.body.parentFolder && req.body.parentFolder !== "null" ? req.body.parentFolder : null;
    const file = new File({
      name: req.file.filename,
      path: req.file.path,
      parentFolder: parentFolder || null,
      uploadedBy: req.user.id,
    });

    await file.save();
    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get all folders & files in a folder
const getFolderContents = async (req, res) => {
  try {
    const { folderId } = req.params;

    const folders = await Folder.find({ parentFolder: folderId || null });
    const files = await File.find({ parentFolder: folderId || null });

    res.json({ folders, files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Delete a folder
const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    await Folder.findByIdAndDelete(folderId);
    res.json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Export all functions
module.exports = { createFolder, uploadFile, getFolderContents, deleteFolder };





