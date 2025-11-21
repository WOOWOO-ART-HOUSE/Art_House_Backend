import mongoose from 'mongoose';
export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log('✅ Database is connected.');
  } catch (error) {
    console.log('❌ Database connection error.', error.message);
  }
}
