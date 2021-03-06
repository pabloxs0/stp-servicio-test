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
module.exports = router;


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
//https://efws-dev.stpmex.com/efws/API/conciliacion
        var options = {
            hostname: 'efws-dev.stpmex.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': json.length
            }
        };

        // var postreq = await https.request(options, function (res) {
        //     //Handle the response
        //     console.log("POST_RES", res.statusCode);
        //     console.log("POST_RES", res.statusMessage);
        // });
        //
        // postreq.write(json);
        // postreq.end();


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