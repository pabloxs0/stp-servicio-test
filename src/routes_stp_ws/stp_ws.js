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

async function consume_ws(req_, res_, path) {
    var ie = 0;

    var json = JSON.stringify(req.body);
    if (json == "{}") {
        res_.json({"error": "Cuerpo vacío '" + json + "'."});
        return
    }

    var http = require('http');//, PORT = 7002;

    const options = {
        hostname: 'prod.stpmex.com',
        port: 7002,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(json)
        }
    };
    res.json({"mensaje": "FIN"});

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            res.json({"mensaje": chunk});
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

// Write data to request body
    req.write(json);
    req.end();

    //res_.json({"mensaje": await p});



}


async function consume_ws_ant(req, res, path) {
    var ie = 0;

    var json = JSON.stringify(req.body);
    if (json == "{}") {
        res.json({"error": "Cuerpo vacío '" + json + "'."});
        return
    }

    var http = require('http');//, PORT = 7002;
    ie = 4;
    var options = {
        hostname: 'prod.stpmex.com',
        port: 7002,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': json.length
        }
    };
    let p = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });
        });
        req.on('error', (err) => {
            reject(err);
            //res.json({"error_fatal": err.message});
            // return;
        });
        req.write(json)
        req.end();
    });
    //let res = await p;
    res.json({"mensaje": await p});


    //   res.json({"mensaje": postreq.body});
}
