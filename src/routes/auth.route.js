import express from 'express';
import {
  healthCheck,
  login,
  register,
  requestOtp,
  verifyOtp,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/check', healthCheck);
router.post('/register', register);
router.post('/login', login);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

export default router;
