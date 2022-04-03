const router = require('express').Router();
const axios = require('axios');
const {Type} = require('../db')

router.get('', async (req, res) => {
    const findDbTypes = await Type.findAll()
    const allDbTypes = findDbTypes.map(e => e.dataValues.name)
    // console.log(findDbTypes) 

    if(allDbTypes.length > 0) {
        res.send(allDbTypes)
    } else {
        const apiTypes = await axios.get('https://pokeapi.co/api/v2/type')
        const typeNames = await apiTypes.data.results.map(e => e.name)
        
        for(var i=0; i<typeNames.length; i++) {
            await Type.findOrCreate({
                where: {name: typeNames[i]}
            })
        };
        const findDbTypes = await Type.findAll()
        const allDbTypes = findDbTypes.map(e => e.dataValues.name)
        res.send(allDbTypes)
    }
});

module.exports = router;