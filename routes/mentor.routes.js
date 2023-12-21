const express = require('express');
const router = express.Router();
const mentors = require('../models/mentor.model.js');

router.use(express.json());

router.get('/mentors', (req,res) => {
    try{
       mentors.find().then((data) => {
        res.status(200).send({message: 'Mentors data have been retrieved', data: data})
       }).catch((error)=>{
        res.status(400).send({message: 'Error While Retriving A Data'})
       })
    }catch(error){
       res.status(500).send({message: "Internal Server Error"})
    }
});

router.post('/createMentor', (req, res) => {
    try{
      const newMentor = new mentors(req.body);
      newMentor.save().then((data) => {
        res.status(201).send({message: 'New Mentor Has Been Added In Data...'})
      }).catch((error)=>{
        res.status(400).send({message: 'Error While Adding A Mentor'})
      })
    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
});

module.exports = router;