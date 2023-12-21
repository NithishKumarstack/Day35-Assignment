const express = require('express');
const student = require('../models/student.model.js');
const router = express.Router();

router.use(express.json());

router.get('/students', (req,res) => {
    try{
       student.find().then((data) => {
        res.status(200).send({message: 'Students data have been retrieved', data: data})
       }).catch((error)=>{
        res.status(400).send({message: 'Error While Retriving A Data'})
       })
    }catch(error){
       res.status(500).send({message: "Internal Server Error"})
    }
});

router.post('/createStudent', (req, res) => {
    try{
      const newStudent = new student(req.body);
      newStudent.save().then((data) => {
        res.status(201).send({message: 'New Student Has Been Added In Data...'})
      }).catch((error)=>{
        res.status(400).send({message: 'Error While Adding A Student'})
      })
    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
});

module.exports = router;