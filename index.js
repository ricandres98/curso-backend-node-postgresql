const { config } = require('./config/config');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler')


const { logErrors, errorHandler, boomErrorHandler, SequelizeErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = config.port || 3000;

app.use(express.json());

// const whitelist = ['http://localhost:8080', 'https://myapp.co'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   }
// }
app.use(cors());

require('./utils/auth');

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get(
  '/api/nueva-ruta',
  checkApiKey,
  (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(SequelizeErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
