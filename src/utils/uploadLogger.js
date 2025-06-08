const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../../logs/upload-audit.log");

function logUploadEvent(event) {
  const logEntry = `${new Date().toISOString()} | IP: ${event.ip} | fileName: ${
    event.fileName
  } | contentType: ${event.contentType} | key: ${event.key}\n`;
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) {
      console.error("Failed to write audit log:", err);
    }
  });
}

module.exports = { logUploadEvent };
