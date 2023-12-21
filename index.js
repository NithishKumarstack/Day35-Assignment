require('dotenv').config();
const express = require('express');
const mentor = require('./routes/mentor.routes.js');
const student = require('./routes/student.routes.js');
const assign = require('./routes/assign.stumen.js');
const reassign = require('./routes/reassign.stumen.js');
const showstu = require('./routes/show.stumen.js');
const routers = require('./routes/prev.ass.stumen.js');
const db = require('./database/connect.js');
//connecting DB
db();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running In A ${PORT} PORT`)
});
console.log(routers);
app.use(routers);
app.use(mentor);
app.use(student);
app.use(assign);
app.use(reassign);
app.use(showstu);
