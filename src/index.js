/*
*
*
* https://www.youtube.com/watch?v=bK3AJfs7qNY
*
* https://www.youtube.com/watch?v=B7aYEoclllA&t=1394s
*
* PASOS PARA ECHAR A ANDAR UN SERVIDOR.
*
* sudo apt update
* sudo apt upgrade
* sudo apt install nginx INSTALAR NGINX
* systemctl status nginx VERIFICAR NGINX
*
* sudo apt-get install ufw INSTALA Y HABILITA UFW [fIREWALL]
* sudo ufw enable
*
* sudo ufw allow 'NGINX Full' AGREGAMOS PUERTOS AL FW
*
* sudo ufw allow 7025 >>>> AGREGAMOS EL PUERTO QUE VAMOS A USAR!!!!
*
* curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
* sudo apt install nodejs
*
* sudo apt install git
*
* cd /var/www/stp-servicio-test
*
* >>>>CLONAR REPOSITORIO
* cd /var/
* cd www
* sudo git clone https://github.com/pabloxs0/stp-servicio-test.git
*
* cd stp-servicio-test  >>VE A LA CARPETA
* sudo npm i >>>>INSTALA LOS MODULOS
*
*>>> INSTALAMOS PM2 PARA DEJAR CORRIENDO EL SERVICIO
* sudo npm i -g pm2
*
* cd /var/www/stp-servicio-test/src >>VAMOS A LA CARPETA SRC
*
* pm2 start index.js
*
*CREO UNA VM DE WINDOWS PARA CHECAR, PRIMERO POR IP LA PAGINA INICAL DE NGINX
* Y DESPUÉS CON POSTMAN COMUNICAR CON EL SERVICIO.
*
* OBTENER DE GIT:
* sudo git pull
*
* RESETEAR SERVICIO:
* pm2 restart index
*
 */
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
app.use(require('./routes/pruebas'));
//start server
app.listen(app.get('port'),()=> {
   console.log(`Server on port ${7025}`);//backtick (alt+96)
});