// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'لم يتم تحميل أي ملف' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    
    res.status(200).json({
      imageUrl: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Error uploading to cloudinary:', error);
    res.status(500).json({ error: 'فشل في تحميل الصورة' });
  }
});

module.exports = router;