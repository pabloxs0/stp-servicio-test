const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {

   res.json({"Titulo": "Hola Mundo Rout"});
})

module.exports = router;