const privateConfig = require('../config/private-config.json');
const qs = require("qs");
const axios = require('axios');
const config = privateConfig.odkCentralConfig;
const instance = axios.create({ baseURL: privateConfig.santeMpiConfig.apiURL });

class SanteAPI {
  constructor() { }

  async getTokenPassword(data) {
    const response = await axios.request({
      url: `${privateConfig.santeMpiConfig.apiURL}auth/oauth2_token`,
      method: 'post',
      data: qs.stringify(data),
      auth: {
        username: data.username,
        password: data.password,
      },
    });
    return response.data;
  }

  async getTokenCredential(data) {
    const response = await axios.request({
      url: `${privateConfig.santeMpiConfig.apiURL}auth/oauth2_token`,
      method: 'post',
      data: qs.stringify(data),
      auth: {
        username: data.client_id,
        password: data.client_secret,
      },
    });
    return response.data;
  }

  async GET(accessToken, url) {
    if (url != null) {
      const response = await instance.get(`fhir/Patient${url}`, {
        headers: {
          Authorization: `${accessToken}`,
          Accept: 'application/fhir+json',
          'Content-Type': 'application/fhir+json'
        },
      });
      return response.data;
    } else {
      const response = await instance.get(`fhir/Patient`, {
        headers: {
          Authorization: `${accessToken}`,
          Accept: 'application/fhir+json',
          'Content-Type': 'application/fhir+json'
        },
      });
      return response.data;
    }
  }

  async getSimilar(accessToken, url) {
    const response = await instance.get(`hdsi/Patient/${url}/mdm-candidate`, {
      headers: {
        Authorization: `${accessToken}`,
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      },
    });
    return response.data;
  }

  async POST(newFhirPatient, accessToken) {
    const response = await instance.post(`fhir/Patient`, newFhirPatient, {
      headers: {
        Authorization: `${accessToken}`,
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      },
    });
    return response.data;
  }

  async PUT(newFhirPatient, accessToken, id) {
    const response = await instance.put(`fhir/Patient/${id}`, newFhirPatient, {
      headers: {
        Authorization: `${accessToken}`,
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      },
    });
    return response.data;
  }

  async merge(newFhirObject, accessToken) {
    const response = await instance.post(`fhir/Bundle`, newFhirObject, {
      headers: {
        Authorization: `${accessToken}`,
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      },
    });
    return response.data;
  }
}

module.exports = {
  SanteAPI
};