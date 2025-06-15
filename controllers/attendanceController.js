const { addAttendanceRecord, getAttendanceRecords } = require("../models/attendanceModel");

exports.storeAttendance = async (req, res) => {
  const {
    employeeId,
    firstName,
    project,
    date,
    shift,
    tracker
  } = req.body;

  if (!employeeId || !firstName || !date) {
    return res.status(400).json({ message: "Missing core fields." });
  }

  if (!Array.isArray(tracker) || tracker.length === 0) {
    return res.status(400).json({ message: "Missing tracker data." });
  }

  const track = tracker[tracker.length - 1];

  if (!track.clockIn && !track.clockOut) {
    return res.status(400).json({ message: "Tracker entry must have at least clockIn or clockOut." });
  }

  if (track.clockIn && (!project || !shift)) {
    return res.status(400).json({ message: "Project and shift required for punch-in." });
  }

  const newRecord = {
    employeeId,
    firstName,
    project,
    date,
    shift,
    tracker
  };

  try {
    const saved = await addAttendanceRecord(newRecord);
    return res.status(201).json({ message: "Attendance updated.", data: saved });
  } catch (err) {
    return res.status(500).json({ message: "Error saving attendance.", error: err.message });
  }
};

exports.getAttendanceByEmployee = async (req, res) => {
    const { employeeId } = req.params;

    if (!employeeId) {
        return res.status(400).json({ message: "Employee ID is required." });
    }

    try {
        const allRecords = getAttendanceRecords();
        const filteredRecords = allRecords.filter(record => record.employeeId === employeeId);

        if (filteredRecords.length === 0) {
            return res.status(404).json({ message: "No attendance records found for the given employee ID." });
        }

        return res.status(200).json({ data: filteredRecords });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching records.", error: err.message });
    }
};

exports.getAllAttendance = async (req, res) => {
    try {
        const records = getAttendanceRecords();
        return res.status(200).json({ data: records });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching attendance records.", error: err.message });
    }
};