const express = require('express');
const router = express.Router();
router.use(express.json());
const Mentor = require('../models/mentor.model');

router.get('/mentorStudents/:mentorId', async (req, res) => {
    try {
        const mentorId = req.params.mentorId;

        const mentor = await Mentor.findOne({ mentorId }).populate('assignedStudents');

        if (!mentor) {
            return res.status(404).send({ message: 'Mentor not found' });
        }

        const students = mentor.assignedStudents.map(student => ({
            studentId: student.studentId,
            studentName: student.studentName,
            studentCourse: student.studentCourse,
        }));

        res.status(200).send({ mentorName: mentor.mentorName, students: students });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
