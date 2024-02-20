require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();



// middelware
app.use(express.json());
app.use(cookieParser());
app.use(cors(({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})));


//routes
app.use("/", require('./routes/user'));
app.use("/cow", require('./routes/cow'));
app.use("/medicalExam", require('./routes/medicalExam'));
app.use("/birth", require('./routes/birth'));
app.use("/milkProduction", require('./routes/milkProduction'));





process.on("uncaughtException", err => console.log(`There is an Error: ${err}`));

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running in port ${PORT}`);
})




