const access_token = require('../santeMPI/acces-token');
const { SanteAPI } = require("../santeMPI/sante-mpi-api");
const santeAPI = new SanteAPI();
const privateConfig = require('../config/private-config.json');

const createPatient = async (patientBody, res,accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //call post api
      await santeAPI.POST(patientBody, accessToken).then(async (response) => {
        return resolve(response);
      }).catch(error => { res.status(400).send(error) })
    } catch (error) {
      throw error;
    }
  })
};

//User auth
const userAuthentication = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //Extracting user auth headers
      const username = req.body.headers.username;
      const password = req.body.headers.password;
      const client_id = req.body.headers.client_id;
      const client_secret = req.body.headers.client_secret;
      const grant_type = req.body.headers.grant_type;

      //check the grant type
      if (grant_type == privateConfig.santeMpiConfig.grant_type_p) {
        await access_token.getAccessTokenPasswordGrant(username, password, client_id, client_secret, grant_type).then((response) => {
          // console.log(response)
          res.status(200).send(response)
          return resolve(response);
        }).catch(error => {
          res.status(400).send(error)
        })
      } else if (grant_type == privateConfig.santeMpiConfig.grant_type) {
        await access_token.getAccessTokenCredentialGrant(client_id, client_secret, grant_type).then((response) => {
          // console.log(response)
          res.status(200).send(response)
          return resolve(response);
        }).catch(error => {
          res.status(400).send(error)
        })
      }
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  })
}
//POST API
const POST = async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //Acces token
      const accessToken = req.headers.authorization;
      createPatient(req.body, res,accessToken).then((response) => {
        res.status(200).send(response)
        return response;
      }).catch(error => {
        res.status(400).send(error)
      })
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  } else { res.status(500).send("No FHIR body specified") }
}
//GET API
const GET = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      
      const accessToken = req.headers.authorization;
      let url = req._parsedUrl.search;
      console.log(url)
      //call get api
      await santeAPI.GET(accessToken, url).then(async (response) => {
        //console.log(response)
        res.status(200).send(response)
        return resolve(response);
      }).catch(error => {
        res.status(400).send(error)
      })
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  })
}
//getSimilar
const getSimilar = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //Acces token
      const accessToken = req.headers.authorization;
      let url = req.params.id;
      //call get api
      await santeAPI.getSimilar(accessToken, url).then(async (response) => {
        res.status(200).send(response)
        return resolve(response);
      }).catch(error => {
        res.status(400).send(error)
      })
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  })
}
//POST PUT
const PUT = async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //Acces token
      const accessToken = req.headers.authorization;
      //call post api
      await santeAPI.PUT(req.body, accessToken, req.params.id).then(async (response) => {
        // return resolve(response);
        res.status(200).send(response)
      }).catch(error => {
        res.status(400).send(error)
      })
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  } else { res.status(500).send("No FHIR body specified") }
}
//Merge
const merge = async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //Acces token
      const accessToken = req.headers.authorization;
      //call post api
      await santeAPI.merge(req.body, accessToken).then(async (response) => {
        // return resolve(response);
        res.status(200).send(response)
      }).catch(error => {
        res.status(400).send(error)
      })
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  } else { res.status(500).send("No FHIR body specified") }
}

module.exports = {
  userAuthentication,
  POST,
  GET,
  PUT,
  createPatient,
  merge,
  getSimilar
}