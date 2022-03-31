const getApiInfo = require('./getApiInfo.js')
const getDbInfo = require('./getDbInfo.js')

const getAllPokemons = async () => {
    const api = await getApiInfo();
    const db = await getDbInfo();
    const all = api.concat(db);

    console.log(all)
    return all;
} 

module.exports = getAllPokemons