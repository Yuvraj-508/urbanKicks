import express from 'express'
import { sendOtp } from '../controlllers/otpControler.js';

const router = express.Router();

router.post('/send-otp', sendOtp);

export default router;