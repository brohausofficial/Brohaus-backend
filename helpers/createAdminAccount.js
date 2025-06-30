import userModel from "../models/userModel.js";

export const createAdminAccount = async () => {
    const adminUser = await userModel.findOne({mobileNumber: process.env.ADMIN_MOBILE})
    if (!adminUser) {
        await userModel.create({
            mobileNumber: process.env.ADMIN_MOBILE, role: "admin", isVerified: true,
            email: "admin@brohaus.in"
        });
    }
};
