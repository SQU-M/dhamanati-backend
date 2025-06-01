const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanMigrations() {
  console.log('Cleaning up migration history...');
  
  try {
    // Delete migration history
    await prisma.$executeRaw`DELETE FROM "_prisma_migrations";`;
    console.log('Migration history cleaned successfully');
  } catch (error) {
    console.error('Error cleaning migrations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanMigrations();