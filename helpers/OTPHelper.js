import axios from 'axios';
import mobileNumberOTPModel from "../models/mobileNumberOTPModel.js";

export const sendOTPHelper = async (user) => {
    try {
        // Generate 4 digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Send OTP via SMS gateway
        const response = await axios.get(
            `https://2factor.in/API/V1/${process.env.TWO_FACTOR_API_KEY}/SMS/+91${user.mobileNumber}/${otp}/`
        );

        if (response.status !== 200) {
            return false
        }

        // Save OTP to database
        await mobileNumberOTPModel.create({
            userId: user._id,
            otp: otp
        });
        return true
    } catch (error) {
        return false
    }
}
