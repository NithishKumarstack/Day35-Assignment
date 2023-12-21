const express = require('express');
const routers = express.Router();
// router.use(express.json);
const Student = require('../models/student.model.js');

routers.get('/previousMentor/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findOne({ studentId }).populate('mentor');
        console.log(student);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        const previousMentor = student.mentor;
        const response = {
            studentName: student.studentName,
            mentorName: previousMentor ? previousMentor.mentorName : null,
        };
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = routers;