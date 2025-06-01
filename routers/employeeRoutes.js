const express = require('express');
const router = express.Router();
const { addEmployee, getAllEmployees } = require('../controllers/employeeController');

router.post('/', addEmployee);
router.get('/', getAllEmployees);

module.exports = router;