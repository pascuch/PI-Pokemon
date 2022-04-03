import axios from 'axios';

export function getAllPokemons() {
    return function(dispatch) {
        return fetch('http://localhost:3001/pokemons')
                .then(r => r.json())
                .then(data => dispatch({type: 'GET_ALL_POKEMONS', payload: data}))
    }
}

export function getPokemonById(id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
                .then(r => r.json())
                .then(data => dispatch({type: 'GET_POKEMON_ID', payload: data}))
    }
}

export function getPokemonByName(name) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/pokemons?name=${name}`)
                .then(r => r.json())
                .then(data => dispatch({type: 'GET_POKEMON_NAME', payload: data}))
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

// export function createPokemon()