
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import ejsLayouts from 'express-ejs-layouts';
import logger from 'morgan';
import http from 'http';
import swaggerUi from 'swagger-ui-express'; // Importer le module swagger-ui-express
import YAML from 'yamljs';
import { authenticateJWT } from './middleware/verificate.js'; // Importer le middleware

import indexRouter from './routes/index.js';
import chatRouter from './routes/chat.js';
import userRouter from './routes/users.js';

const app = express();
const __filename = fileURLToPath(import.meta.url); // Chemin absolu du fichier actuel
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load('./docs/swagger.yaml');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(indexRouter);
app.use(userRouter);


// error handler
app.use(function(err, req, res, next) {
  console.log("error");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');        
});


const port = normalizePort('8080');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

//server.on('error', onError);
//server.on('listening', onListening);
app.use('/chat', authenticateJWT, chatRouter(server));
app.use(chatRouter(server));

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  logger('Listening on ' + bind);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.status( 404);
  res.render('404');        
  //next();
});
server.listen(port);