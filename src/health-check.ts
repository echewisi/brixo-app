import { createConnection } from 'mongoose';

async function healthCheck() {
  try {
    // Check MongoDB connection
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/brixo-ifsc';
    const mongoose = await createConnection(mongoUri).asPromise();
    await mongoose.close();
    
    console.log('Health check passed');
    process.exit(0);
  } catch (error) {
    console.error('Health check failed:', error);
    process.exit(1);
  }
}

healthCheck();

