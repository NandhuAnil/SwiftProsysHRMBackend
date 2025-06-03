const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Login route
router.post('/login', authController.login);

// Example protected route for 'admin' role
// router.get('/admin/dashboard', verifyToken, authorizeRoles('admin'), (req, res) => {
//   res.json({ message: `Welcome Admin ${req.user.id}` });
// });

// Example protected route for 'user' role
// router.get('/user/profile', verifyToken, authorizeRoles('user', 'admin'), (req, res) => {
//   res.json({ message: `Welcome User ${req.user.id}` });
// });

module.exports = router;
