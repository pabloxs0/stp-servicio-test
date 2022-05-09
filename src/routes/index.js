const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {

   res.json({"STP": "Hola STP bienvenido a GCP sinube."});
})

module.exports = router;