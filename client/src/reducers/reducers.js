import React, { Component } from "react";
import { connect } from "react-redux";

const initialState = {
    pokemons: [],
    filteredPokemons: [],
    types: []
  };

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
      case 'GET_ALL_POKEMONS':
        return {
          ...state,
          pokemons: action.payload,
          filteredPokemons: action.payload
        }
      case 'GET_ALL_TYPES':
        return {
          ...state,
          types: action.payload
        }
      case 'FILTER_BY_TYPE':
        const allPokemons = state.pokemons
        const typeFilter = action.payload === 'All Types' ? 
                           allPokemons : 
                           allPokemons.filter(e => {
                              let find = e.types.find(t => t === action.payload)
                              if(find) return e
                            })
        return {
          ...state,
          filteredPokemons: typeFilter
        }
      case 'FILTER_BY_ORIGIN':
        const allPokemons2 = state.pokemons
        const typeFilter2 = () => {
                          if(action.payload === 'All Pokemons') return allPokemons2;
                          if(action.payload === 'Existing') return allPokemons2.filter(e => e.createdInDb === false);
                          if(action.payload === 'Created') return allPokemons2.filter(e => e.createdInDb === true);
                         }
        return {
          ...state,
          filteredPokemons: typeFilter2()
        }
      case 'SORT_BY_NAME':
        const allPokemons3 = state.filteredPokemons
        const sort = () => {
        if(action.payload === 'All Pokemons') return allPokemons3;
        if(action.payload === 'A - Z') {
          return allPokemons3.sort(function (a, b) {
            if ( a.name < b.name ){
              return -1;
            }
            if ( a.name > b.name ){
              return 1;
            }
            return 0;
          })
        };
        if(action.payload === 'Z - A') {
          return allPokemons3.sort(function (a, b) {
            if ( a.name > b.name ){
              return -1;
            }
            if ( a.name < b.name ){
              return 1;
            }
            return 0;
          })
        };
        if(action.payload === 'Max') {
          return allPokemons3.sort(function (a, b) {
            if ( a.attack > b.attack ){
              return -1;
            }
            if ( a.attack < b.attack ){
              return 1;
            }
            return 0;
          })
        };
        if(action.payload === 'Min') {
          return allPokemons3.sort(function (a, b) {
            if ( a.attack < b.attack ){
              return -1;
            }
            if ( a.attack > b.attack ){
              return 1;
            }
            return 0;
          })
        }
      }
      
      return {
        ...state,
        filteredPokemons: sort()
      }
        
      
      default: return state;
      }

}

