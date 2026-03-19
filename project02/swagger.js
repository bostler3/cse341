const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: "Library API. Can retrieve all authors and books in the database, retrieve a single author or book by the ID, create a new author or book, modify an existing author's or book's information and delete an existing author or book."
    },
    host: 'cse341-project02-movl.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);