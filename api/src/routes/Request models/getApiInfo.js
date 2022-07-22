const axios = require('axios');

const getApiInfo = async () => {
    const allPoke = []
    const limit = 100; 

    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
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
                            img: pokeInfo.sprites.other.home.front_default,
                            createdInDb: false
                        }
        
        return allPoke.push(pokeData)
    } 

    const promises = apiInfo.map(p => subRequest(p));
    await Promise.all(promises)

    return allPoke
}

module.exports = getApiInfo