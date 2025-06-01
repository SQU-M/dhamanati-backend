const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function initDatabase() {
  console.log('Initializing database...');
  
  try {
    // Create tables if they don't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "warranties" (
        "id" SERIAL PRIMARY KEY,
        "productName" TEXT NOT NULL,
        "purchaseDate" TIMESTAMP(3) NOT NULL,
        "expiryDate" TIMESTAMP(3) NOT NULL,
        "notes" TEXT,
        "imageUrl" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "userId" INTEGER NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      );
    `;
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();