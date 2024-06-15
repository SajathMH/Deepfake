const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { detectDeepfake } = require('./deepfakeDetection');

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/detect', upload.single('file'), async (req, res) => {
  try {
    const result = await detectDeepfake(req.file.path);
    res.json({ result });
  } catch (error) {
    console.error('Error detecting deepfake:', error);
    res.status(500).json({ error: 'Error detecting deepfake' });
  } finally {
    // Delete the uploaded file after processing
    fs.unlinkSync(req.file.path);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});