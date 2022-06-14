// const {Router} = require('express');
// const router = Router();
//
// router.post('/ws_conciliacion', (req, res) => {
//
//     console.log("JSON_PRE_VACIO", req.body);
//
//     var json = JSON.stringify(req.body);
//     if (json == "{}") {
//         res.json({"error": "Cuerpo vacío '" + json + "'."});
//         return
//     }
//
//     console.log("JSON_NO_VACIO", json);
//
//     var https = require('https');
// //https://efws-dev.stpmex.com/efws/API/conciliacion
//     var options = {
//         hostname: 'efws-dev.stpmex.com',
//         path: '/efws/API/conciliacion',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': json.length
//         }
//     };
//
//     var postreq = https.request(options, function (res) {
//         //Handle the response
//         console.log("POST_RES", res.statusCode);
//         console.log("POST_RES", res.statusMessage);
//     });
//
//     postreq.write(json);
//     postreq.end();
//
//     res.json({"mensaje": "mensaje enviado a STP"});
// })
//
// module.exports = router;
//
//
// // {
// //    "id": 3191365,
// //     "fechaOperacion": 20200127,
// //     "institucionOrdenante": 846,
// //     "institucionBeneficiaria": 90646,
// //     "claveRastreo": "12345",
// //     "monto": 0.01,
// //     "nombreOrdenante": "STP",
// //     "tipoCuentaOrdenante": 40,
// //     "cuentaOrdenante": "846180000400000001",
// //     "rfcCurpOrdenante": "ND",
// //     "nombreBeneficiario": "NOMBRE_DE_BENEFICIARIO",
// //     "tipoCuentaBeneficiario": 40,
// //     "cuentaBeneficiario": "64618012340000000D",
// //     "nombreBeneficiario2": "NOMBRE_DE_BENEFICIARIO2",
// //     "tipoCuentaBeneficiario2": 40,
// //     "cuentaBeneficiario2": "64618012340000000D",
// //     "rfcCurpBeneficiario": "ND",
// //     "conceptoPago": "PRUEBA1",
// //     "referenciaNumerica": 1234567,
// //     "empresa": "NOMBRE_EMPRESA",
// //     "tipoPago":1,
// //     "tsLiquidacion": "1634919027297",
// //     "folioCodi": "f4c1111abd2b28a00abc"
// // }
