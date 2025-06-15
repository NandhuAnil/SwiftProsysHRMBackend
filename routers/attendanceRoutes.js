const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/add', attendanceController.storeAttendance);
router.get('/', attendanceController.getAllAttendance);
router.get('/:employeeId', attendanceController.getAttendanceByEmployee);

module.exports = router;