const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/me', auth, (req, res) => {
  const { id, name, email, createdAt } = req.user;
  res.json({ id, name, email, createdAt });
});

module.exports = router;
