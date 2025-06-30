import express from 'express';
import onlyAdminAccess from '../middleware/onlyAdminAccess.js';
import authUser from "../middleware/auth.js";

const adminRouter = express.Router();

// Example protected admin route
adminRouter.get('/dashboard', authUser, onlyAdminAccess, (req, res) => {
  res.json({ success: true, message: 'Welcome to the admin dashboard' });
});

export default adminRouter;
