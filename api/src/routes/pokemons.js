const router = require('express').Router();
const axios = require('axios');
const {Pokemon, Type} = require('../db');
const getAllPokemons = require('./Request models/getAllPokemons.js')


router.get('', async (req, res) => {
    const { name } = req.query

    if(name) {
        try {
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
            const pokeData = {
                                id: pokemon.data.id,
                                name: pokemon.data.name,
                                height: pokemon.data.height,
                                weight: pokemon.data.weight,
                                hp: pokemon.data.stats.find(e => e.stat.name === 'hp').base_stat,
                                attack: pokemon.data.stats.find(e => e.stat.name === 'attack').base_stat,
                                defense: pokemon.data.stats.find(e => e.stat.name === 'defense').base_stat,
                                speed: pokemon.data.stats.find(e => e.stat.name === 'speed').base_stat,
                                types: pokemon.data.types.map(e => e.type.name),
                                img: pokemon.data.sprites.other.home.front_default,
                            }
            // console.log(typeof id)
           res.send(pokeData)
            
        } catch (e) {
            try {
                const pokeDb = await Pokemon.findOne({
                    where: {name: name.toLowerCase()},
                    include: {
                        model: Type,
                        attributes: ['name']
                    }
                })
                const pokeData = {
                    id: pokeDb.dataValues.ID,
                    name: pokeDb.dataValues.name,
                    height: pokeDb.dataValues.height,
                    weight: pokeDb.dataValues.weight,
                    hp: pokeDb.dataValues.hp,
                    attack: pokeDb.dataValues.attack,
                    defense: pokeDb.dataValues.defense,
                    speed: pokeDb.dataValues.speed,
                    img: pokeDb.dataValues.img,
                    types: pokeDb.dataValues.types.map(e => e.dataValues.name),
                }
                // console.log(pokeDb.dataValues.types)
                res.send(pokeData)

            } catch (e) {
                
                res.status(400).send(`Couldn't find any pokemon with the name "${name}"`)
            }
        }

    } else {
        const all = await getAllPokemons()
        const data = await all.map(e => {
            return {
                    id: e.id,
                    img: e.img,
                    name: e.name,
                    attack: e.attack,
                    types: e.types,
                    createdInDb: e.createdInDb
                   }
        })
        res.send(data)
    }

})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    if(!isNaN(id)) {
        try {
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokeData = {
                                id: pokemon.data.id,
                                name: pokemon.data.name,
                                height: pokemon.data.height,
                                weight: pokemon.data.weight,
                                hp: pokemon.data.stats.find(e => e.stat.name === 'hp').base_stat,
                                attack: pokemon.data.stats.find(e => e.stat.name === 'attack').base_stat,
                                defense: pokemon.data.stats.find(e => e.stat.name === 'defense').base_stat,
                                speed: pokemon.data.stats.find(e => e.stat.name === 'speed').base_stat,
                                types: pokemon.data.types.map(e => e.type.name),
                                img: pokemon.data.sprites.other.home.front_default,
                            }
           res.send(pokeData)
            
        } catch (e) {
            res.status(400).send(`Couldn't find any pokemon with the ID "${id}"`)
        }
        
    } else {
        try {
            const pokeDb = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ['name']
                }
            })
            const pokeData = {
                                id: pokeDb.dataValues.ID,
                                name: pokeDb.dataValues.name,
                                height: pokeDb.dataValues.height,
                                weight: pokeDb.dataValues.weight,
                                hp: pokeDb.dataValues.hp,
                                attack: pokeDb.dataValues.attack,
                                defense: pokeDb.dataValues.defense,
                                speed: pokeDb.dataValues.speed,
                                img: pokeDb.dataValues.img,
                                types: pokeDb.dataValues.types.map(e => e.dataValues.name),
                            };
            // console.log(pokeDb.dataValues)
            res.send(pokeData)
            
        } catch (e) {
            res.status(400).send(`Couldn't find any pokemon with the ID "${id}"`)
        }

    }
})

router.post('', async (req, res) => {
    let {name,
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
        img,
        type} = req.body;
     
    if(!name) return res.status(400).send('Name must be filled');

    const newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
        img,
    })

    let typesDb = await Type.findAll({
        where: {name: type}
    })
    newPokemon.addType(typesDb)

    res.status(200).send('Pokemon created!')
})

module.exports = router;