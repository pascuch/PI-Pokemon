const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const allPoke = []

    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2');
    const apiInfo = await apiUrl.data.results.map(e => {
        return e.url
    })
    
    async function subRequest(url) {
        const pokeApi = await axios.get(url);
        const pokeInfo = await pokeApi.data
           
        const pokeData = {          
                            id: pokeInfo.id,
                            name: pokeInfo.name,
                            height: pokeInfo.height,
                            weight: pokeInfo.weight,
                            hp: pokeInfo.stats.find(e => e.stat.name === 'hp').base_stat,
                            attack: pokeInfo.stats.find(e => e.stat.name === 'attack').base_stat,
                            defense: pokeInfo.stats.find(e => e.stat.name === 'defense').base_stat,
                            speed: pokeInfo.stats.find(e => e.stat.name === 'speed').base_stat,
                            types: pokeInfo.types.map(e => e.type.name),
                            img: pokeInfo.sprites.front_default,
                        }
        
        return allPoke.push(pokeData)
    }

    // for (var i=0; i<apiInfo.length; i++) {
    //    await sub(apiInfo[i])
    // }

    const promises = apiInfo.map(p => subRequest(p));
    await Promise.all(promises)

    console.log(allPoke)

    return allPoke
}

getApiInfo()

module.exports = router;
