// backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'supersecret';

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });

  try {
    // Check if user exists
    const existingUser = await prisma.user.findFirst({ 
      where: { email } 
    });
    
    if (existingUser)
      return res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
  } catch (err) {
    console.error('خطأ في التسجيل:', err);
    res.status(500).json({ error: 'فشل في إنشاء الحساب' });
  }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'كلمة المرور غير صحيحة' });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('خطأ في تسجيل الدخول:', err);
    res.status(500).json({ error: 'فشل في تسجيل الدخول' });
  }
});

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'المستخدم غير موجود' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('خطأ في جلب بيانات المستخدم:', err);
    res.status(500).json({ error: 'فشل في جلب بيانات المستخدم' });
  }
});

module.exports = router;