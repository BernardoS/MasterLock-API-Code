import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger.json';

const endpointsFiles = ['./factories/serverFactory.js'];

swaggerAutogen(outputFile, endpointsFiles);