// router.get('/prueba', (req, res) => {
//     var firma_ = getSign('CADENA_ORIGINAL','src/recursos/sinube_test_ca.pem', 'prueba#500' );
//     res.json({"firma": firma_});
// })


function getSign(cadenaOriginal, path, pwd) {
    const crypto = require('crypto');
    const fs = require('fs');
    var sign = crypto.createSign('RSA-SHA256');
    sign.update(cadenaOriginal);
    sign.end();
    const key = fs.readFileSync(path);
    let signature_b64 = sign.sign({ key, passphrase: pwd}, 'base64');
    return signature_b64;
}