// backend/routes/warranties.js (جزء من الملف)
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

// رفع صورة إلى Cloudinary
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'فشل رفع الصورة' });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

module.exports = router;