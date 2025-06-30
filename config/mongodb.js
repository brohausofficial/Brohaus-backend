import mongoose from "mongoose";
import {createAdminAccount} from "../helpers/createAdminAccount.js";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("DB Connected");
    })

    await mongoose.connect(process.env.MONGODB_URI)
    await createAdminAccount()
}

export default connectDB;
