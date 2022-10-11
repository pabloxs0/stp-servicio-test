// const fs = require('fs');
// const util = require('util');
const {Router} = require('express');
const router = Router();


var log4js = require("log4js");
var logger = log4js.getLogger();


router.post('/ws_test', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    res.json({"mensaje": "prueba exitosa"});
})

router.post('/ws_conciliacion', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/conciliacion');
})
router.post('/ws_consultaCuenta', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/consultaCuenta');
})
router.post('/ws_consultaSaldoCuenta', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/consultaSaldoCuenta');
})

module.exports = router;


// var log_file = fs.createWriteStream(__dirname + '/consola.log', {flags : 'w'});
// var log_stdout = process.stdout;
//
// console.log = function(d) { //
//     log_file.write(util.format(d) + '\n');
//     log_stdout.write(util.format(d) + '\n');
// };

async function consume_ws(req, res, path) {
    var ie = 0;
    try {
        console.log("JSON_PRE_VACIO", req.body);
        ie = 1;
        logger.error("Some debug messages");
        ie = 2;
        var json = JSON.stringify(req.body);
        if (json == "{}") {
            res.json({"error": "Cuerpo vacío '" + json + "'."});
            return
        }
        ie = 3;
        //log("JSON_NO_VACIO", json);

        var https = require('https');
        ie = 4;
        var options = {
            hostname: 'prod.stpmex.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': json.length
            }
        };
        ie = 5;
        let p = new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                res.setEncoding('utf8');
                let responseBody = '';
                ie = 6;
                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
                ie = 7;
                res.on('end', () => {
                    resolve(JSON.parse(responseBody));
                });
                ie = 8;
                console.log("POST_RES", res.statusCode);
                console.log("POST_RES", res.statusMessage);
            });
            ie = 9;
            req.on('error', (err) => {
                reject(err);
            });
            ie = 10;
            req.write(json)
            ie = 11;
            req.end();
        });
        ie = 12;
        let res = await p;
        ie = 13;
        res.json({"mensaje": res});
    } catch (e) {
        res.json({"error": e + "["+ie+"]"});
    }


    //   res.json({"mensaje": postreq.body});
}
