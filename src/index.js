const express = require('express');
const app = express();
const morgan = require('morgan');

//configuraciones
//app.set('port', process.env.PORT || 7024);
app.set('port', 7025);
app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/cobranza'));
app.use(require('./routes/cambio_estado'));
app.use(require('./routes_stp_ws/stp_ws'));
//app.use(require('./routes/pruebas'));
//start server
app.listen(app.get('port'),()=> {
   console.log(`Server on port ${7025}`);//backtick (alt+96)
});
