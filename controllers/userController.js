import userModel from "../models/userModel.js";
import mobileNumberOTPModel from "../models/mobileNumberOTPModel.js";
import { createToken } from "../helpers/jwtHelper.js";
import {sendOTPHelper} from "../helpers/OTPHelper.js";

// Route for user login
export const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    let user = await userModel.findOne({ phone });

    if (!user) {
      if (phone === process.env.ADMIN_MOBILE) {
        user = await userModel.create({ phone, role: "admin" });
      } else {
        user = await userModel.create({ phone, role: "user" });
      }
    }

    const isOTPSent = await sendOTPHelper(user)
    if (isOTPSent) {
      res.json({ success: true, message: "OTP Sent", isVerified: user.isVerified });
    } else {
      res.json({ success: false, message: "An unexpected error has been occurred" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp, email } = req.body;

    let user = await userModel.findOne({ phone });

    if (!user) {
      return res.json({success: false, message: "User not found"});
    }

    const latestOTP = await mobileNumberOTPModel
        .findOne({userId: user._id})
        .sort({createdAt: -1});

    if (!latestOTP) {
      return res.json({success: false, message: "No OTP found"});
    }

    if (latestOTP.otp !== otp) {
      return res.json({success: false, message: "Invalid OTP"});
    }

    if (!user.isVerified) {
      if (!email) {
        return res.json({success: false, message: "Email is required"});
      }
      user.email = email;
      user.isVerified = true;
      await user.save();
    }
    return res.json({
      success: true,
      message: "OTP verified successfully",
      token: createToken(user._id)
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.json({ success: false, message: error.message });
  }
}
