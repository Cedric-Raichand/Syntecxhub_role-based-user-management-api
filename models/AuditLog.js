const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({

  action: {
    type: String,
    required: true
  },

  performedBy: {
    type: String,
    required: true
  },

  targetUser: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);