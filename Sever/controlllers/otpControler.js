import axios from "axios";

const otpStore = {}; // temporary memory storage

export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP temporarily
    // otpStore[phone] = {
    //   otp,
    //   expires: Date.now() + 5 * 60 * 1000 // 5 minutes expiry
    // };

    // Send SMS using Fast2SMS
    const response = await axios.get(
  "https://www.fast2sms.com/dev/bulkV2",
  {
    headers: {
      authorization: process.env.FAST2SMS_API_KEY,
    },
    params: {
      route: "otp",
      variables_values: otp,
      numbers: phone,
    },
  }
);

    console.log("Fast2SMS response:", response.data);

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    return res.json({
      success: false,
      message: "Failed to send OTP",
    });

  }
};