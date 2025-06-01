// backend/routes/warranties.js

const express = require('express');
const router = express.Router();
const { createWarranty } = require('../controllers/warrantyController');
const authMiddleware = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// حماية جميع المسارات
router.use(authMiddleware);

// إضافة ضمان
router.post('/', createWarranty);

// جلب الضمانات الخاصة بالمستخدم
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const warranties = await prisma.warranty.findMany({
      where: { userId },
      orderBy: { expiryDate: 'asc' },
    });
    res.status(200).json(warranties);
  } catch (error) {
    console.error('Error fetching warranties:', error);
    res.status(500).json({ error: 'فشل في جلب الضمانات' });
  }
});

// حذف ضمان
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // التحقق من وجود الضمان وأنه يخص المستخدم الحالي
    const warranty = await prisma.warranty.findFirst({
      where: { 
        id: Number(id),
        userId 
      }
    });
    
    if (!warranty) {
      return res.status(404).json({ error: 'الضمان غير موجود' });
    }
    
    await prisma.warranty.delete({
      where: { id: Number(id) }
    });
    
    res.status(200).json({ message: 'تم حذف الضمان بنجاح' });
  } catch (error) {
    console.error('Error deleting warranty:', error);
    res.status(500).json({ error: 'فشل في حذف الضمان' });
  }
});

module.exports = router;