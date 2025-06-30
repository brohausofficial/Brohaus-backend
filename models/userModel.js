import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    mobileNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['user', 'admin'] },
    isVerified: { type: Boolean, default: false },
    cartData: { type: Object, default: {} }
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel
