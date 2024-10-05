const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Busboy = require("busboy"); // For handling file uploads
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();

// Cloud Function to handle form submission
exports.submitApplication = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const busboy = new Busboy({headers: req.headers});
  const fields = {};
  let fileData = null;

  // Parse incoming fields
  busboy.on("field", (fieldname, val) => {
    fields[fieldname] = val;
  });

  // Handle file upload (resume)
  busboy.on("file", (fieldname, file, filename) => {
    const filepath = path.join(os.tmpdir(), filename);
    fileData = {file: filepath, filename: filename};

    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", async () => {
    try {
      // Upload resume to Firebase Storage
      const uploadPath = `resumes/${Date.now()}-${fileData.filename}`;
      await bucket.upload(fileData.file, {
        destination: uploadPath,
      });

      // Save form data and resume URL to Firestore
      const resumeUrl = `https://storage.googleapis.com/${bucket.name}/${uploadPath}`;
      await db.collection("applications").add({
        ...fields,
        resumeUrl,
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).send({message: "Application submitted successfully!"});
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).send({error: "Failed to submit application"});
    } finally {
      // Clean up temporary file
      if (fileData && fileData.file) {
        fs.unlinkSync(fileData.file);
      }
    }
  });

  req.pipe(busboy);
});
