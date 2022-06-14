/*
*
*
* https://www.youtube.com/watch?v=bK3AJfs7qNY
*
* https://www.youtube.com/watch?v=B7aYEoclllA&t=1394s
*
* cd /var/www/stp-servicio-test
*
* OBTENER DE GIT:
* sudo git pull
*
* RESETEAR SERVICIO:
* pm2 restart stp-app
*
 */
const express = require('express');
const app = express();
const morgan = require('morgan');

//configuraciones
//app.set('port', process.env.PORT || 7024);
app.set('port', 7024);
app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/cobranza'));
app.use(require('./routes/cambio_estado'));
app.use(require('./routes_stp_ws/stp_ws'));
app.use(require('./routes/pruebas'));
//start server
app.listen(app.get('port'),()=> {
   console.log(`Server on port ${7024}`);//backtick (alt+96)
});