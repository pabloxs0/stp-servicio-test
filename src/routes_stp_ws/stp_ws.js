const {Router} = require('express');
const router = Router();

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

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/consola.log', {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

async function consume_ws(req, res, path) {
    try {
        console.log("JSON_PRE_VACIO", req.body);

        var json = JSON.stringify(req.body);
        if (json == "{}") {
            res.json({"error": "Cuerpo vacío '" + json + "'."});
            return
        }

        console.log("JSON_NO_VACIO", json);

        var https = require('https');

        var options = {
            hostname: 'prod.stpmex.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': json.length
            }
        };

        let p = new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                res.setEncoding('utf8');
                let responseBody = '';

                res.on('data', (chunk) => {
                    responseBody += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(responseBody));
                });
                console.log("POST_RES", res.statusCode);
                console.log("POST_RES", res.statusMessage);
            });

            req.on('error', (err) => {
                reject(err);
            });

            req.write(json)
            req.end();
        });

        // return await p;

        res.json({"mensaje": await p});
    } catch (e) {
        res.json({"error": e});
    }


    //   res.json({"mensaje": postreq.body});
}
