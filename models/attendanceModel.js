const fs = require("fs");
const path = require("path");

const attendanceFilePath = path.join(__dirname, "../database/attendance.json");

function getAttendanceRecords() {
  try {
    if (!fs.existsSync(attendanceFilePath)) return [];
    const raw = fs.readFileSync(attendanceFilePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading/parsing attendance file:", err.message);
    return [];
  }
}

function saveAttendanceRecords(attendanceList) {
  try {
    fs.writeFileSync(attendanceFilePath, JSON.stringify(attendanceList, null, 2));
  } catch (err) {
    console.error("Error writing attendance file:", err.message);
    throw err;
  }
}

function addAttendanceRecord(newRecord) {
  const records = getAttendanceRecords();
  const todayKey = `${newRecord.employeeId}_${newRecord.date}`;
  let updated = false;

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const recordKey = `${record.employeeId}_${record.date}`;

    if (recordKey === todayKey) {
      const last = record.tracker[record.tracker.length - 1];

      // Case: Punch Out (only clockOut provided)
      if (last && last.clockOut === "--:--:--" && newRecord.tracker[0].clockOut) {
        last.clockOut = newRecord.tracker[0].clockOut;
      }
      // Case: Punch In (new clockIn)
      else if (newRecord.tracker[0].clockIn) {
        record.tracker.push(...newRecord.tracker);
      }

      records[i] = record;
      updated = true;
      break;
    }
  }

  if (!updated) {
    // First entry of the day
    records.unshift(newRecord);
  }

  saveAttendanceRecords(records);
  return newRecord;
}

module.exports = {
  getAttendanceRecords,
  saveAttendanceRecords,
  addAttendanceRecord,
};
