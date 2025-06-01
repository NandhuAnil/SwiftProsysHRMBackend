const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../database/users.json');

function getEmployees() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveEmployees(employees) {
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));
}

module.exports = { getEmployees, saveEmployees };