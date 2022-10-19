const access_token = require('../santeMPI/acces-token');
const { SanteAPI } = require("../santeMPI/sante-mpi-api");
const santeAPI = new SanteAPI();

const createPatient = async (patientBody, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Acces token
      const accessToken = await access_token.getAccessTokenCredentialGrant();
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
      if (Object.keys(req.body).length !== 0) {
        await access_token.getAccessTokenPasswordGrant(req.body.username, req.body.password).then((response) => {
          // console.log(response)
          res.status(200).send(response)
          return resolve(response);
        }).catch(error => {
          res.status(400).send(error)
        })
      } else { res.status(500).send("No FHIR body specified") }
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
      createPatient(req.body, res).then((response) => {
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
      const accessToken = await access_token.getAccessTokenCredentialGrant();
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
      const accessToken = await access_token.getAccessTokenCredentialGrant();
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
      //Acces token
      const accessToken = await access_token.getAccessTokenCredentialGrant();
      //call post api
      await santeAPI.PUT(req.body, accessToken,req.params.id).then(async (response) => {
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
      //Acces token
      const accessToken = await access_token.getAccessTokenCredentialGrant();
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