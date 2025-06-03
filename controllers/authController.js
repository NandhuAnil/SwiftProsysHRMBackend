const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getEmployees } = require('../models/employeeModel');
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

exports.login = async (req, res) => {
  try {
    const { employeeid, password } = req.body;
    const employees = getEmployees();

    const user = employees.find(emp => emp.employeeid === employeeid);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful', token }); // ✅ role is inside token
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

