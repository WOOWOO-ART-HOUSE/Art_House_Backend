import User from '../models/auth.model.js';
import {checkOtp, sendOtpSms} from '../utils/otp.services.js';
import {createTokenAndSetCookie} from '../utils/token.utils.js';

const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Health check successful.',
    });
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Health check error.',
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      dateOfBirth,
      gender,
      profileImage,
      whatsappNumber,
      city,
      state,
      country,
      pincode,
      occupation,
      role,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !dateOfBirth ||
      !gender ||
      !whatsappNumber ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !occupation
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
      });
    }

    const exist = await User.findOne({whatsappNumber});
    if (exist) {
      return res.status(409).json({
        success: false,
        message: 'Whatsapp number already registered.',
      });
    }

    const user = await User.create({
      fullName,
      email,
      dateOfBirth,
      gender,
      profileImage,
      whatsappNumber,
      city,
      state,
      country,
      pincode,
      occupation,
      role: role || 'user',
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user,
    });
  } catch (error) {
    console.error('Error fetching to register:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching to register.',
    });
  }
};

const login = async (req, res) => {
  try {
    const {whatsappNumber} = req.body;

    if (!whatsappNumber) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required.',
      });
    }
    const user = await User.findOne({whatsappNumber});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user,
    });
  } catch (error) {
    console.error('Error fetching to login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching to login.',
    });
  }
};

const requestOtp = async (req, res) => {
  try {
    const {whatsappNumber} = req.body;

    if (!whatsappNumber) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required.',
      });
    }
    await sendOtpSms(whatsappNumber);

    res.status(200).json({
      message: 'OTP sent successfully.',
      success: true,
    });
  } catch (error) {
    console.error('Error fetching to request otp:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching to request otp.',
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const {whatsappNumber, otp} = req.body;
    if (!whatsappNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
    const isValid = checkOtp(whatsappNumber, otp);
    if (!isValid)
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP.',
      });
    const user = await User.findOne({whatsappNumber});
    const token = createTokenAndSetCookie(res, whatsappNumber);

    return res.status(200).json({
      success: true,
      message: 'OTP Verified Successfully.',
      token,
      user,
    });
  } catch (error) {
    console.error('Error fetching to verify otp:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching to verify otp.',
    });
  }
};

export {healthCheck, register, login, requestOtp, verifyOtp};
