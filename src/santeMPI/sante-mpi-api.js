const privateConfig = require('../config/private-config.json');
const qs = require("qs");
const axios = require('axios');
const config = privateConfig.odkCentralConfig;
const instance = axios.create({ baseURL: privateConfig.santeMpiConfig.apiURL });
const openHimInstance = axios.create({ baseURL: privateConfig.santeMpiConfig.santApiURL });
const _ = require('lodash');
const json_functions = require("../functions/functions.js");

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
    openHimInstance.post(privateConfig.santeMpiConfig.santApiURL,{});
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
    openHimInstance.post(privateConfig.santeMpiConfig.santApiURL,{});
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
      openHimInstance.get(privateConfig.santeMpiConfig.santApiURL,{});
      return response.data;
    } else {
      const response = await instance.get(`fhir/Patient`, {
        headers: {
          Authorization: `${accessToken}`,
          Accept: 'application/fhir+json',
          'Content-Type': 'application/fhir+json'
        },
      });
      openHimInstance.get(privateConfig.santeMpiConfig.santApiURL,{});
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
    openHimInstance.get(privateConfig.santeMpiConfig.santApiURL,{});
    return response.data;
  }

  async POST(newFhirPatient, accessToken) {
    var found = false;
    var resp = {};
    
    if (newFhirPatient.identifier){
      for (var i=0; i<newFhirPatient.identifier.length; i++){
        var ident = newFhirPatient.identifier[i];
        let url = '?identifier='+ident.system+'|'+ident.value+'&_count=1'; 
        const response = await instance.get(`fhir/Patient${url}`, {
            headers: {
              Authorization: `${accessToken}`,
              Accept: 'application/fhir+json',
              'Content-Type': 'application/fhir+json'
            },
        });
        openHimInstance.get(privateConfig.santeMpiConfig.santApiURL,{});
        resp = response.data;
        if (resp.total != 0)
        {
          found = true;
          break;
        }
      } 
    }

    if (found == false) {
      let url ='?';
      if (newFhirPatient.name[0]['family'] != null){
        url += 'family='+newFhirPatient.name[0]['family']+'&';
      }
      if (newFhirPatient.name[0]['given'] != null){
        url += 'given='+newFhirPatient.name[0]['given']+'&';
      }
      if (newFhirPatient.birthDate != null){
        url += 'birthdate='+newFhirPatient.birthDate+'&';
      }
      if (newFhirPatient.gender != null){
        url += 'gender='+newFhirPatient.gender;
      }

      url += '&_count=1';

      console.log(url);

      const response = await instance.get(`fhir/Patient${url}`, {
          headers: {
            Authorization: `${accessToken}`,
            Accept: 'application/fhir+json',
            'Content-Type': 'application/fhir+json'
          },
      });
      openHimInstance.get(privateConfig.santeMpiConfig.santApiURL,{});
      resp = response.data;
      if (resp.total != 0)
      {
        found = true;
      }
    }
    
    if (found == true)
    {
      return resp;
    }
    else
    {
      const response = await instance.post(`fhir/Patient`, newFhirPatient, {
        headers: {
          Authorization: `${accessToken}`,
          Accept: 'application/fhir+json',
          'Content-Type': 'application/fhir+json'
        },
      });
      openHimInstance.post(privateConfig.santeMpiConfig.santApiURL,{});
      return response.data;
    }
  }

  async PUT(newFhirPatient, accessToken, id) {
    const get_response = await instance.get(`fhir/Patient/${id}`, {
      headers: {
        Authorization: `${accessToken}`,
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      },
    });
    openHimInstance.get(privateConfig.santeMpiConfig.santApiURL,{});
    var get_resp = get_response.data;

    var main_patient_resource =  json_functions.alter_patient_resource(get_resp,'add_system');

    var updated_patient_resource = json_functions.alter_patient_resource(json_functions.remove_health_id(newFhirPatient),'add_system');

    var new_patient_resource = json_functions.alter_patient_resource(_.merge(main_patient_resource, updated_patient_resource),'remove_system');

    const response = await instance.put(`fhir/Patient/${id}`, new_patient_resource, {
      headers: {
        Authorization: `${accessToken}`,
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      },
    });
    openHimInstance.put(privateConfig.santeMpiConfig.santApiURL,{});
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
    openHimInstance.post(privateConfig.santeMpiConfig.santApiURL,{});
    return response.data;
  }
}

module.exports = {
  SanteAPI
};