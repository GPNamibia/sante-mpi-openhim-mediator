# SanteMPI Mediator
This mediator is intended sending request to sante mpi server

# Private Configurations
The `private-config.json` is used to store all the credentials and connection URLs of the mediator. The credentials are currently left out, so the file needs to be renamed with all the required credentials and URLs before installation for the mediator to work.


# INISTALL

## Requirements

1. `Node.js 12 or later`
2. `npm`
3. `MongoDB`
4. `Docker`
5. `OpenHIM`
6. `Postgress`
7. `npm (version 6 or higher)`


## Installation in Localhost

To run the mediator without connecting it to the OpenHIM server, you can use the following commands if you have `Node.js` installed:

1. Clone or download the repository.`git clone https://github.com/UCSF-GP-Namibia/sante-mpi-openhim-mediator.git`

2. `cd sante-mpi-mediator`

3. Run `npm install` to install the dependencies

4. Start the development server with `npm start`


## Installation in Docker

The mediator can be built and run using the `docker-compose.yml` file configurations.

1. Clone or download the repository.`git clone https://github.com/UCSF-GP-Namibia/sante-mpi-openhim-mediator.git`

2. Navigate to `odk-central-mediator` folder where the  `docker-compose.yml` is.

3. `docker-compose build`

4. `docker-compose up -d`

5. `docker network create openHIM`


## Tests

You can run the Unit tests using the following command:

1. `cd sante-mpi-mediator`

2. `npm run test`

# HOWTO

## Usage

1. Make a `GET` request to  `/localhost:8080/getResource?:url` to retrieve Sante MPI Resources
2. Make a `POST` request to  `/localhost:8080/postResource` to create Sante MPI Resources.
3. Make a `PUT` request to  `/localhost:8080/updateResource/:id` to update Sante MPI Resources.

## Authentication

1. Make a `POST` request to `/localhost:8080/userAuth` endpoint which Receives token from SanteMPI upon accepted user credentials
2. Make a `GET` request to  `/localhost:8080/getResource?:url` to Validate user token with SanteMPI.


## Authentication
The API uses a `Beaer Token` for authentication. To access the endpoints, you will need to pass a valid token in the Authorization header of your requests.

## Errors
The API uses the following error codes:

1. `401` Unauthorized: The request could not be authenticated.
2. `404` Not Found: The requested resource could not be found.
3. `500` Internal Server Error: An error occurred on the server.


## More information
For more information on the API, please contact the developer.