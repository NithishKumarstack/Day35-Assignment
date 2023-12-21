const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    mentorId: {
      type: Number,
      required: true,
      trim: true
    },
    mentorName: {
      type: String,
      required: true,
      trim: true,
    },
    mentorRole: {
      type: String,
      required: true,
      trim: true,
      enum: ['Assistant Mentor', 'Senior Mentor', 'Junior Mentor'],
    },
    assignedStudents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'students',
  }],
});

module.exports = mongoose.model('mentors', mentorSchema);