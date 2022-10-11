// const fs = require('fs');
// const util = require('util');
const {Router} = require('express');
const router = Router();

const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/ws_test', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    res.json({"mensaje": "prueba exitosa"});
})

router.post('/ws_conciliacion', (req, res) => {
    console.log("ANTES---------------");
    console.log(req.body);
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
        ie = 1000;
        var json = JSON.stringify(req.body);
        ie = 19;
        if (json == "{}") {
            ie = 21;
            res.json({"error": "Cuerpo vacío '" + json + "'."});
            ie = 22;
            return
        }
        ie = 2;
        //var json = "dd";

        var http = require('http');//, PORT = 7002;
        ie = 3;
        const options = {
            hostname: 'prod.stpmex.com',
            port: 7002,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        ie = 4;
        let p = new Promise((resolve, reject) => {
            const req_prom = http.request(options, (res) => {
                res.setEncoding('utf8');
                ie = 5;
                let responseBody = '';
                ie = 6;
                res.on('data', (chunk) => {
                    ie = 7;
                    responseBody += chunk;
                });
                res.on('end', () => {
                    ie = 8;
                    resolve(JSON.parse(responseBody));
                });
            });
            req_prom.on('error', (err) => {
                //ie = err;
                res.json({"error_fatal": err.message});
                reject(err);

                // return;
            });
            ie = 10;
            req_prom.write(json)
            ie = 11;
            req_prom.end();
            ie = 12;
        });
        //let res = await p;
        ie = 13;
        res.json({"mensaje": await p});

    } catch (e) {
        console.log(e);
        var error_c = "";
        error_c = e + "("+ie+")";
        //var err_t = "ERR" + ie;
        res.json({'Err': error_c});

    }


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
