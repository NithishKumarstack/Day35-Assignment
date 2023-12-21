const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
    type: Number,
    required: true,
    trim: true
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentCourse: {
      type: String,
      required: true,
      trim: true,
      enum: ['FSD', 'UI/UX', 'DATA SCIENCE']
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mentors',
  },
});

module.exports = mongoose.model('students', studentSchema);