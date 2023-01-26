## Prerequisites

1. `Node.js 12 or later`
2. `npm`
3. `MongoDB`
4. `Docker`
5. `OpenHIM`
6. `Postgress`
7. `npm (version 6 or higher)`


## Step 1: Clone the repository
Clone the repository by running the following command in your terminal:

Run `git clone https://github.com/UCSF-GP-Namibia/sante-mpi-openhim-mediator.git`

## Step 2: Install dependencies
Navigate to the project's root directory and run the following command to install the necessary dependencies:

Run `cd sante-mpi-mediator`

Run `npm install` to install the dependencies

## Step 3: Configure the environment
Create a new file called private-config.json in the project's `src/config/private-config.json` directory and fill in the necessary environment variables.

## Step 4: Start the server
You can start the server by running the following command:

Run `npm start`

This will start the server on port 9000 by default. You can change the port number in private-config file.

## Step 5: Test the API
You can test the API by making requests to the endpoints using a tool like Postman.The API can be found inthe `HOWTO.md` file

## More information
For more information on the API, please contact the developer.