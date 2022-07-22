import axios from 'axios';

export function getAllPokemons() {
    return async function(dispatch) {
        // return fetch('/pokemons')
        //         .then(r => r.json())
        //         .then(data => dispatch({type: 'GET_ALL_POKEMONS', payload: data}))
        const pokemons = await axios.get('/pokemons')
        return dispatch({
            type: 'GET_ALL_POKEMONS', 
            payload: pokemons.data
        })
    }
}

export function getPokemonDetail(id) {
    return async function(dispatch) {
        const pokemonId = await axios.get(`/pokemons/${id}`)
        return dispatch({type: 'GET_POKEMON_DETAIL', payload: pokemonId.data});
    }
}

export function getAllTypes() {
    return async function(dispatch) {
        const types = await axios.get(`/types`)
        return dispatch({type: 'GET_ALL_TYPES', payload: types.data});
    }
}

export function filterByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function sortByName(payload) {
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}

export function searchByName(name) {
    return async function(dispatch) {
        try {
            const pokemonName = await axios.get(`/pokemons?name=${name}`)
            dispatch({type: 'GET_POKEMON_BY_NAME', payload: pokemonName.data}) 
        } catch (e) {
            dispatch({type: 'GET_POKEMON_BY_NAME', 
                      payload: {error: `Couldn't find any pokemon with the name "${name}"`}})
        }
    }
}

export function postPokemon(payload) {
    return async function(dispatch) {
        const pokemon = await axios.post('/pokemons', payload)
        return dispatch({
            type: 'POST_POKEMON',
            payload: pokemon
        })
    }
}


