const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON body data

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Name files uniquely
  },
});

const upload = multer({ storage });

// Create "uploads" directory if not existing
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Route to handle the form submission
app.post("/submit", upload.single("resume"), (req, res) => {
  const formData = req.body;
  const resumeFile = req.file;

  console.log("Received form data: ", formData);
  if (resumeFile) {
    console.log("Resume file uploaded: ", resumeFile.filename);
  }

  // Simulate saving to a database here...

  // Send success response
  res.status(200).json({ message: "Application received successfully!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
