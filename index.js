const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const dotenv = require('dotenv').config();
const mainRouter = require('./controllers');
const generateMobileNumbers = require('./crons');

const app = express();

app.use(cors());

if (process.env.ENABLE_CRON === 'Y') {
    cron.schedule("*/10 * * * * *",generateMobileNumbers);
}

app.use(mainRouter);

app.listen(9000,() => {
    console.log("Server started on port 9000");
})