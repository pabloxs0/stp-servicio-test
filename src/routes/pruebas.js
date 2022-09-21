const {Router} = require('express');
const router = Router();
const crypto = require('crypto');
const fs = require('fs');

router.get('/prueba', (req, res) => {
    var cadenaOrig = "||FINE_FLOOR|R|||";
    var firma_ = getSign(cadenaOrig,'src/recursos/KEY_STORE_TEST.jks', 'prueba#500' );
    console.log("FIRMA", firma_);
    res.json({"firma": firma_});
})

function getSign(cadenaOriginal, path, pwd) {
    var sign = crypto.createSign('RSA-SHA256');
    sign.update(cadenaOriginal,"utf8");
    sign.end();
    const key = fs.readFileSync(path);
    let signature_b64 = sign.sign(key, 'base64');
    return signature_b64;
}

// function getSign() {
//     const sign = crypto.createSign('SHA256');
//     sign.write('some data to sign');
//     sign.end();
//     const signature = sign.sign(privateKey, 'hex');
//
//     const verify = crypto.createVerify('SHA256');
//     verify.write('some data to sign');
//     verify.end();
//     console.log(verify.verify(publicKey, signature, 'hex'));
// }

module.exports = router;


// {
//    "id": 3191365,
//     "fechaOperacion": 20200127,
//     "institucionOrdenante": 846,
//     "institucionBeneficiaria": 90646,
//     "claveRastreo": "12345",
//     "monto": 0.01,
//     "nombreOrdenante": "STP",
//     "tipoCuentaOrdenante": 40,
//     "cuentaOrdenante": "846180000400000001",
//     "rfcCurpOrdenante": "ND",
//     "nombreBeneficiario": "NOMBRE_DE_BENEFICIARIO",
//     "tipoCuentaBeneficiario": 40,
//     "cuentaBeneficiario": "64618012340000000D",
//     "nombreBeneficiario2": "NOMBRE_DE_BENEFICIARIO2",
//     "tipoCuentaBeneficiario2": 40,
//     "cuentaBeneficiario2": "64618012340000000D",
//     "rfcCurpBeneficiario": "ND",
//     "conceptoPago": "PRUEBA1",
//     "referenciaNumerica": 1234567,
//     "empresa": "NOMBRE_EMPRESA",
//     "tipoPago":1,
//     "tsLiquidacion": "1634919027297",
//     "folioCodi": "f4c1111abd2b28a00abc"
// }
