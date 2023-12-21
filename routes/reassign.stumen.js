const express = require('express');
const router = express.Router();
router.use(express.json());
const Mentor = require('../models/mentor.model.js');
const Student = require('../models/student.model.js');

router.put('/reassignMentor/:studentId/:mentorId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const mentorId = req.params.mentorId;

        const mentor = await Mentor.findOne({ mentorId });
        const student = await Student.findOne({ studentId });

        if (!mentor || !student) {
            return res.status(404).send({ message: 'Mentor or student not found' });
        }

        if (student.mentor) {
            const previousMentor = await Mentor.findOne({ _id: student.mentor });
            previousMentor.assignedStudents = previousMentor.assignedStudents.filter(id => id.toString() !== student._id.toString());
            await previousMentor.save();
        }

        mentor.assignedStudents.push(student._id);
        student.mentor = mentor._id;
        await mentor.save();
        await student.save();

        res.status(200).send({ message: 'Mentor assigned or changed for the student successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
