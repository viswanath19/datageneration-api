const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const dotenv = require('dotenv').config();
const mainRouter = require('./controllers');
const generateMobileNumbers = require('./crons/mobileNumberGenerator');
const emailAddressGenerator = require('./crons/emailGenerator');

const app = express();

app.use(cors());

app.use(express.json());

if (process.env.ENABLE_CRON === 'Y') {
    cron.schedule(process.env.CRON_INTERVAL,generateMobileNumbers);
    cron.schedule(process.env.CRON_INTERVAL,emailAddressGenerator);
}

app.use(mainRouter);

app.listen(9000,() => {
    console.log("Server started on port 9000");
})