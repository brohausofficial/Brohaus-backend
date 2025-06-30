import mongoose from "mongoose";

const mobileNumberOTPSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    otp: {
        type: String,
        required: true
    }
}, { minimize: false, timestamps: true })

const mobileNumberOTPModel = mongoose.models.mobileNumberOTP || mongoose.model('mobileNumberOTP',mobileNumberOTPSchema);

export default mobileNumberOTPModel
