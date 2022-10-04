// const privateConfig = require('../config/private-config.json');
// const mediatorConfig = require('../config/mediator-config.json');

// // OpenHIM
// const { registerMediator, activateHeartbeat, fetchConfig } = require('openhim-mediator-utils');
// let queryParams;
// const openhimVars = privateConfig.openhimConfig;
// const openhimConfig = {
//     username: openhimVars.username,
//     password: openhimVars.password,
//     apiURL: openhimVars.apiURL,
//     trustSelfSigned: true,
//     urn: mediatorConfig.urn
// }
// const emitter = activateHeartbeat(openhimConfig);

// registerMediator(openhimConfig, mediatorConfig, err => {
//     if (err) {
//         throw new Error(`Failed to register mediator. Check your Config. ${err}`)
//     }
// });

// fetchConfig(openhimConfig, (err, initialConfig) => {
//     if (err) {
//         throw new Error(`Failed to fetch initial config. ${err}`)
//     }
//     console.log('Initial Config: ', JSON.stringify(initialConfig))
//     queryParams = initialConfig.labResultsParams
// });

// emitter.on('error', err => {
//     console.error('Heartbeat failed: ', err)
// });

// emitter.on('config', newConfig => {
//     console.log('Received updated config:', JSON.stringify(newConfig))
//     queryParams = newConfig.labResultsParams
// });

// function getQueryParameters() { return queryParams }
// module.exports = { getQueryParameters, queryParams };