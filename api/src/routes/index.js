const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const types = require('./types');
const pokemons = require('./pokemons')

const router = Router();

router.use('/pokemons', pokemons);
router.use('/types', types)


module.exports = router;
