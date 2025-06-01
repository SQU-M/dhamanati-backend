// backend/controllers/warrantyController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createWarranty = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productName, purchaseDate, expiryDate, notes, imageUrl } = req.body;

    const warranty = await prisma.warranty.create({
      data: {
        productName,
        purchaseDate: new Date(purchaseDate),
        expiryDate: new Date(expiryDate),
        notes,
        imageUrl,
        userId,
      },
    });

    res.status(201).json(warranty);
  } catch (error) {
    console.error('Error creating warranty:', error);
    res.status(500).json({ error: 'فشل في إضافة الضمان' });
  }
};

module.exports = {
  createWarranty,
};