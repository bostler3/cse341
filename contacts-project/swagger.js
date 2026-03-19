const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: "Contacts API. Can retrieve all contacts in the database, retrieve a single contact by the contact ID, create a new contact, modify an existing contact's information and delete an existing contact."
    },
    host: 'cse341-contacts-project-o2mp.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);