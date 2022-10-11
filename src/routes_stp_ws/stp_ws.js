
// const {Router} = require('express');
// var bodyParser = require('body-parser')
// const router = Router();

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post('/ws_test', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    res.json({"mensaje": "prueba exitosa"});
})

app.post('/ws_conciliacion', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/conciliacion');
})
app.post('/ws_consultaCuenta', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/consultaCuenta');
})
app.post('/ws_consultaSaldoCuenta', (req, res) => {
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
        console.log(req.body);
        //console.log(`Server on port ${7025}`);//backtick (alt+96)
        ie = 1;
        var cuerpo = req.body;
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

        // var http = require('http');//, PORT = 7002;
        ie = 3;
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
        // res.json({"mensaje": json});
        ie = 4;
        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                ie = 5;
                //res.json({"mensaje": chunk});
            });
            res.on('end', () => {
                console.log('No more data in response.');
                ie = 6;
                res.json({"mensaje": "FIN END"});
            });
        });
        ie = 7;
        req.on('error', (e) => {
            ie = 8;
            console.error(`problem with request: ${e.message}`);
        });

// Write data to request body
        ie = 9;
        req.write(json);
        req.end();
        ie = 10;
        //res_.json({"mensaje": await p});

    } catch (e) {
        var error_c = "";
        error_c = e.mensaje + "("+ie+")";
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
