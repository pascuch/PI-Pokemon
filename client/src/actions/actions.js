import axios from 'axios';

export function getAllPokemons() {
    return function(dispatch) {
        return fetch('http://localhost:3001/pokemons')
                .then(r => r.json())
                .then(data => dispatch({type: 'GET_ALL_POKEMONS', payload: data}))
    }
}

export function getPokemonDetail(id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
                .then(r => r.json())
                .then(data => dispatch({type: 'GET_POKEMON_DETAIL', payload: data}))
    }
}

export function getAllTypes() {
    return function(dispatch) {
        return fetch(`http://localhost:3001/types`)
                .then(r => r.json())
                .then(data => dispatch({type: 'GET_ALL_TYPES', payload: data}))
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
    return function(dispatch) {
            return fetch(`http://localhost:3001/pokemons?name=${name}`)
                    .then(r => r.json())
                    .then(data => dispatch({type: 'GET_POKEMON_BY_NAME', payload: data}))
                    .catch(e => dispatch({type: 'GET_POKEMON_BY_NAME', payload: {error: `Couldn't find any pokemon with the name "${name}"`}}))
    }
}

export function postPokemon(payload) {
    return async function(dispatch) {
        const pokemon = await axios.post('http://localhost:3001/pokemons', payload)
        // console.log('PAYLOAD: ', payload)
        // console.log('RESPONSE: ', pokemon)
        return dispatch({
            type: 'POST_POKEMON',
            payload: pokemon
        })
    }
}