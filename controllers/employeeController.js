const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getEmployees, saveEmployees } = require('../models/employeeModel');

const SECRET_KEY = 'your_jwt_secret';

exports.addEmployee = async (req, res) => {
  try {
    const {
      firstName, lastName, email, position, department,
      phone, employeeid, password, joinDate
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      position,
      department,
      phone,
      employeeid,
      password: hashedPassword,
      joinDate,
      role: 'user'
    };

    const employees = getEmployees();
    employees.push(newEmployee);
    saveEmployees(employees);

    const token = jwt.sign({ id: newEmployee.id, role: 'user' }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'Employee added successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllEmployees = (req, res) => {
  try {
    const users = getEmployees();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};