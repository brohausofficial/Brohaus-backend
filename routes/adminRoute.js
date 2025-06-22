import express from 'express';
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

// Example protected admin route
adminRouter.get('/dashboard', adminAuth, (req, res) => {
  res.json({ success: true, message: 'Welcome to the admin dashboard' });
});

export default adminRouter;
