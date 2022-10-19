const qs = require("qs");
const axios = require('axios');
const privateConfig = require('../config/private-config.json');
const CLIENT_ID = privateConfig.santeMpiConfig.client_id;
const APP_SECRET = privateConfig.santeMpiConfig.client_secret;
const { SanteAPI } = require("./sante-mpi-api");
const santeAPI = new SanteAPI();

const getAccessTokenPasswordGrant = async (username, password) => {
    return new Promise(async (resolve, reject) => {
        const data = {
            grant_type: privateConfig.santeMpiConfig.grant_type_p,
            client_id: CLIENT_ID,
            client_secret: APP_SECRET,
            username: username,
            password: password
        };
        //call get token api
        await santeAPI.getTokenPassword(data).then((res) => {
            console.log("Bearer "+res.access_token)
            return resolve(res);
        }).catch(error=>{
            return resolve(error);
        })
    })
};

const getAccessTokenCredentialGrant = async (username, password) => {
    return new Promise(async (resolve, reject) => {
        const data = {
            grant_type: privateConfig.santeMpiConfig.grant_type,
            client_id: CLIENT_ID,
            client_secret: APP_SECRET,
            username: username,
            password: password
        };
        //call get token api
        await santeAPI.getTokenPassword(data).then((res) => {
            return resolve("Bearer " + res.access_token);
        }).catch(error=>{
            return resolve(error);
        })
    })
};

module.exports = {
    getAccessTokenPasswordGrant,
    getAccessTokenCredentialGrant
};