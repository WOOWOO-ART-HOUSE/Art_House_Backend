import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },

    profileImage: {
      type: String, // URL
      default: null,
    },

    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['admin', 'user'], // ✔ Allowed roles
      default: 'user',
      required: true,
    },
  },
  {timestamps: true},
);

const User = mongoose.model('User', userSchema);
export default User;
