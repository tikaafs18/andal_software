const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const { jobRouter } = require('./routers');
app.use('/job', jobRouter);

const dbConf = require('./config/db');
dbConf.getConnection((error, connection) => {
    if (error) return res.status(500).send(error.sqlMessage);
    console.log('Express connection to mysql is success', connection.threadId);
})

app.listen(PORT, () => {
    console.log('API Express JS is running on port : ', PORT)
})