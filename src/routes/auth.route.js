import express from 'express';
import {
  healthCheck,
  login,
  register,
  requestOtp,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/check', healthCheck);
router.post('/register', register);
router.post('/login', login);
router.post('/request-otp', requestOtp);

export default router;
