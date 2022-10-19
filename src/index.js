const express = require("express");
const privateConfig = require('./config/private-config.json');
const { getQueryParameters } = require('./openHIM/initialize.js');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

// middleware
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))

// routers
const router = require('./routes/apiRouter')
app.use('/api', router)


//openHIM
getQueryParameters();

app.get('/api', async (req, res) => {
    // Starts when a new request is triggered by the polling channel
    console.log(`\n---------------------------------------------------------------------------------`,
        `\n${new Date().toUTCString('en-GB', { timeZone: 'UTC' })}  - `,
        `The ODK Central EBS has received a new request. \n`
    );
});

//Server PORT
app.listen(privateConfig.appConfig.PORT, (err) => {
    if (err) console.log(`Error: ${err}`)
    console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
})