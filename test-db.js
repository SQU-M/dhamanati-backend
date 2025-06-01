const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test query execution
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query executed successfully:', result);
    
    // Test user table
    console.log('Testing user table...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
    
    const user = await prisma.user.create({
      data: testUser
    });
    
    console.log('✅ User created successfully:', user.id);
    
    // Clean up
    await prisma.user.delete({
      where: { id: user.id }
    });
    
    console.log('✅ Test user deleted successfully');
    console.log('✅ All database tests passed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();