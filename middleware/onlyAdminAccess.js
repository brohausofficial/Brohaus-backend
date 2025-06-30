import userModel from "../models/userModel.js";

const onlyAdminAccess = async (req, res, next) => {
    try {
        if (req.body.userId) {
            const user = await userModel.findById(req.body.userId)
            if (!user && user.role !== "admin" && user.mobileNumber !== process.env.ADMIN_MOBILE) {
                res.json({ success: false, message: "Unauthorized Access" })
            }
            next()
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default onlyAdminAccess
