const { conn, Pokemon, Type } = require('../../db');

const getDbInfo = async () => {
    const allDb = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    const infoDb = await allDb.map(e => {
        return {
                id: e.dataValues.ID,
                name: e.dataValues.name,
                height: e.dataValues.height,
                weight: e.dataValues.weight,
                hp: e.dataValues.hp,
                attack: e.dataValues.attack,
                defense: e.dataValues.defense,
                speed: e.dataValues.speed,
                img: e.dataValues.img,
                types: e.dataValues.types.map(e => e.name),
                createdInDb: e.dataValues.createdInDb
               }
    })

    console.log(infoDb)
    return infoDb
}

module.exports = getDbInfo;