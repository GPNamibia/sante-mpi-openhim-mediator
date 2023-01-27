
# Endpoints

  

## GET Request

  

URL: `localhost:8080/getResource?:url`

Method: `GET`
  
Authentication: `Required`

Parameter: | _**localhost:8080**_ | Specifies the link to where the santeMPI is hosted |

Parameter: | _**/getResource**_ | Specifies Sante MPI Resources endpoint|

Parameter: | _**?:url**_ | Specifies a placeholder for a variable in the endpoint's URL.|

  

**Response:**

  

  

```json
{
    "resourceType": "Bundle",
    "id": "urn:uuid:3aeca4f3-5c10-4dc0-b63d-bbe3ba930af1",
    "type": "searchset",
    "timestamp": "2022-07-27T14:27:31.121903+00:00",
    "total": 1,
    "link": [
        {
            "relation": "self",
            "url": "Patient?freetext=Dr Mike&"
        }
    ],
    "entry": [
        {
            "link": [
                {
                    "relation": "_self",
                    "url": "Patient/e5e64ba2-4d64-4b11-b2b1-a9983139f601/_history/abcaea55-23e5-46ae-a97c-fa430ce361ac"
                }
            ],
            "fullUrl": "http://127.0.0.1:8080/fhir/Patient/e5e64ba2-4d64-4b11-b2b1-a9983139f601",
            "resource": {
                "resourceType": "Patient",
                "id": "e5e64ba2-4d64-4b11-b2b1-a9983139f601",
                "meta": {
                    "versionId": "abcaea55-23e5-46ae-a97c-fa430ce361ac",
                    "lastUpdated": "2022-07-20T14:20:08.643212+00:00",
                    "security": [
                        {
                            "system": "http://santedb.org/security/policy",
                            "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
                        }
                    ],
                    "tag": [
                        {
                            "system": "http://santedb.org/fhir/tags",
                            "code": "$mdm.type:M"
                        },
                    ]
                },
                "active": true,
                "name": [
                    {
                        "use": "official",
                        "family": "Verlem",
                        "given": [
                            "Dr Mike"
                        ]
                    }
                ],
                "telecom": [
                    {
                        "system": "phone",
                        "value": "0815713080",
                        "use": "mobile"
                    }
                ],
                "gender": "female",
                "birthDate": "2022-04-25",
                "address": [
                    {
                        "use": "home",
                        "country": "Namibia"
                    }
                ],
            },
            "search": {
                "mode": "match"
            }
        }
    ]
}
```

  

  

## POST Request

  

  

URL: `localhost:8080/postResource`

Method: `POST`

Authentication: `Required`

Parameter: | _**localhost:8080**_ | Specifies the link to where the santeMPI is hosted |

Parameter: | _**/postResource**_ | Specifies Sante MPI postResource endpoint|

  

**Request Body:**

  

  

```json

{
    "resourceType": "Patient",
    "gender": "male",
    "identifier": [
        {
            "system": "urn:oid:4.0",
            "value": "1968689767"
        }
    ],
    "name": [ {
        "family": "Ken",
        "given": "Pete",
        "use":"usual"
      }],
    "birthDate": "1986-10-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ]
}

  

```

  

  

**Response:**

  

  

```json
{
    "resourceType": "Patient",
    "id": "c04b204b-1c2c-46cd-a827-a707793971a7",
    "meta": {
        "versionId": "07dd2a3c-6635-48d1-93eb-6c0353cf829a",
        "lastUpdated": "2022-07-28T08:15:09.572005+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Ken",
            "given": [
                "Pete"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1986-10-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/a68375a3-6c83-4ef3-b4c7-5000ebdee5f3"
            },
            "type": "refer"
        }
    ]
}
```

  

  

## PUT Request

  

  

URL: `localhost:8080/updateResource/:id`

Method: `PUT`

Authentication: `Required`

Parameter: | _**localhost:8080**_ | Specifies the link to where the santeMPI is hosted |

Parameter: | _**/patient**_ | Specifies Sante MPI Resources endpoint|

Parameter: | _**/:id**_ | Specifies a placeholder for a variable in the endpoint's URL.|

  

**Request Body:**

  

  

```json

{
    "resourceType": "Patient",
    "gender": "male",
    "identifier": [
        {
            "system": "urn:oid:4.0",
            "value": "1968689767"
        },
        {
            "system": "urn:oid:3.7",
            "value": "12WENR6"
        }
    ],
    "name": [ {
        "family": "Peter",
        "given": "Ken",
        "use":"usual"
      }],
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ]
}

```

  

  

**Response:**

  

  

```json
{
    "resourceType": "Patient",
    "id": "f019ba9f-5db8-411c-b8be-3f8fc0aa6262",
    "meta": {
        "versionId": "1fbed60f-f521-4f7a-9881-12f2f5f993b2",
        "lastUpdated": "2022-07-28T12:12:39.623512+00:00",
        "security": [
            {
                "system": "http://santedb.org/security/policy",
                "code": "1.3.6.1.4.1.33349.3.1.5.9.2.2.3"
            }
        ],
        "tag": [
            {
                "system": "http://santedb.org/fhir/tags",
                "code": "$dcdr.refetch:true"
            }
        ]
    },
    "identifier": [
        {
            "system": "http://ohie.org/National_ID",
            "value": "1968689767"
        },
        {
            "system": "http://ohie.org/Health_ID",
            "value": "12WENR6"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "usual",
            "family": "Peter",
            "given": [
                "Ken"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1976-09-16",
    "address": [
        {
            "use": "home",
            "country": "Namibia"
        }
    ],
    "link": [
        {
            "other": {
                "reference": "Patient/cf172f30-86f9-4c92-abbc-30f69d2210b1"
            },
            "type": "refer"
        }
    ]
}
```

  

  

## Authentication

  

## User authentication

  

  

URL: `localhost:8080/userAuth`

Method: `POST`

Authentication: `Required`

Parameter: | _**localhost:8080**_ | Specifies the link to where the santeMPI is hosted |

Parameter: | _**/userAuth**_ | Specifies Sante MPI userAuth endpoint|
  

**Request Body:**

  

  

```json
{
    "grant_type":"password"
    "client_id":"wick"
    "client_secret":"wick"
    "username":"john"
    "password":"john"
}
```

  

  

**Response:**

  

  

```json
{
"access_token": "8C108588B30DED119ED50242AC160004E7F7FB80F5FCBE7A7D6A7FBFB53BC60B9E2DB0C7B063FBFA63DA17BFAB7526BF",

"id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsIm5hbWUiOiI4MmY0MGE4OC05MDlmLTExZWMtYTNmNy0wMjQyYWMxNjAwMDIifQ."
"eyJ1bmlxdWVfbmFtZSI6ImpvaG4iLCJyb2xlIjoiUEVSU09OIiwiYXV0aG1ldGhvZCI6IlBhc3N3b3JkIiwibmFtZWlkIjoiNjQ2YTI5MDYtYmExZ"

"token_type": "bearer",
"expires_in": 3599937,

"refresh_token": "CC4854779AD0764C8802003DB15CE8E27418039113F83087924C1DF66E71AB271D704ACE68674240881ADA8D11B02BF8"

}

```

  

  

## Token verification

  

  

URL: `localhost:8080/getResource?:url`

Method: `GET`

 
Authentication: `Required`

Parameter: | _**localhost:8080**_ | Specifies the link to where the santeMPI is hosted |

Parameter: | _**/getResource**_ | Specifies Sante MPI getResource endpoint|

Parameter: | _**?:url**_ | Specifies a placeholder for a variable in the endpoint's URL.|
  

  

**Response:**

  
  
```json
{
   {
    "resourceType": "Bundle",
    "id": "urn:uuid:ff3e29f6-48d1-4607-bcdd-f61879f86c6c",
    "type": "searchset",
    "timestamp": "2022-07-27T14:04:44.52914+00:00",
    "total": 26,
    "link": [
        {
            "relation": "self",
            "url": "Patient?_page=0&_count=25"
        },
        {
            "relation": "next",
            "url": "Patient?_page=1&_count=25"
        },
        {
            "relation": "last",
            "url": "Patient?_page=1&_count=25"
        }
    ],
    }
}

```