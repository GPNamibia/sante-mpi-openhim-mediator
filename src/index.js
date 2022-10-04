const express = require("express");
const privateConfig = require('./config/private-config.json');
const { getQueryParameters } = require('./openHIM/initialize.js');
const db = require('./models');
const app = express();
const cors = require('cors')
const access_token=require('../src/santeMPI/acces-token')

// access_token.getAccessTokenCredentialGrant().then((res)=>{
//     console.log(res)
// })

// middleware

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))

// routers
const router = require('./routes/apiRouter')
app.use('/api/santeResources', router)


//openHIM
// getQueryParameters();

app.all('*', async(req, res) => {
    // Starts when a new request is triggered by the polling channel
    console.log(`\n---------------------------------------------------------------------------------`,
        `\n${ new Date().toUTCString('en-GB', { timeZone: 'UTC' }) }  - `,
        `The ODK Central EBS has received a new request. \n`
    );
});

//Server PORT
db.sequelize.sync({}).then((req) => {
    app.listen(privateConfig.appConfig.PORT, (err) => {
        if (err) console.log(`Error: ${err}`)
        console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
    });
}).then(() => {
    console.log(`Succesfully connected to '${privateConfig.development.database}' database...  \n`)
}).catch(err => { console.log(`Error when connecting to '${privateConfig.development.database}' database...:: \n`, err) });