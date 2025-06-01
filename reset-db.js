const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
  console.log('Starting database reset...');
  
  try {
    // Delete all data from tables in correct order
    console.log('Deleting existing data...');
    await prisma.$executeRaw`TRUNCATE TABLE "warranties" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE;`;
    
    console.log('Database reset completed successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();