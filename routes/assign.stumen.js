const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor.model');
const Student = require('../models/student.model');

router.post('/assignStudent/:mentorId/:studentId', async (req, res) => {
    try {
        const mentorId = req.params.mentorId;
        const studentId = req.params.studentId;

        const mentor = await Mentor.findOne({ mentorId });
        const student = await Student.findOne({ studentId });

        if (!mentor || !student) {
            return res.status(404).send({ message: 'Mentor or student not found' });
        }

        if (student.mentor) {
            return res.status(400).send({ message: 'Student already has a mentor' });
        }

        mentor.assignedStudents.push(student._id);
        student.mentor = mentor._id;

        await mentor.save();
        await student.save();

        res.status(200).send({ message: 'Student assigned to mentor successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
