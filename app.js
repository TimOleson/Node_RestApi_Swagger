const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const app = express();
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger/swaggerDocument');
const swaggerJsDoc = require('swagger-jsdoc');

 
const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Stats Api', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  servers: ['http://localhost:3000/api/v1'],
  // Path to the API docs
  apis: ['./routes/router.js'],
};


const swaggerDocs = swaggerJsDoc(options);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';


app.set('port', PORT);
app.set('env', NODE_ENV);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(logger('tiny'));
app.use(bodyParser.json());

app.use('/', require(path.join(__dirname, './routes/router.js')));

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});



app.listen(PORT, () => {

  
  console.log(
    `Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${app.get('env')}`
  );
});