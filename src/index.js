/*
*
*
* https://www.youtube.com/watch?v=bK3AJfs7qNY
*
* https://www.youtube.com/watch?v=B7aYEoclllA&t=1394s
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
app.use(require('./routes/index'));
//start server
app.listen(app.get('port'),()=> {
   console.log(`Server on port ${7024}`);//backtick (alt+96)
});