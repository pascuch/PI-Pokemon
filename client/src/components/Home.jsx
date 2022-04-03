import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllPokemons, getAllTypes, filterByType, filterByOrigin, sortByName } from "../actions/actions";
import Card from "./Card";
import Pages from "./Pages";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.filteredPokemons)
    const allTypes = useSelector(state => state.types)

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(4);
    const [order, setOrder] = useState('')
    const lastPokemon = currentPage * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);

    function pages(number) {
        setCurrentPage(number)
    }

    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    }, []) 
    
    // console.log(allTypes)
    

    function handleReload(e) {
        e.preventDefault();
        dispatch(getAllPokemons());
    }

    function handleTypeFilter(e) {
        e.preventDefault();
        dispatch(filterByType(e.target.value))
    }

    function handleOriginFilter(e) {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1)
        setOrder(`Sorted by ${e.target.value}`)
    }

    return (
        <div className="App">
            <h1>This is HOME</h1>
            <button onClick={e => handleReload(e)}>Reload</button>
            <div>
                <input placeholder="Write full name"></input>
                <button>Search</button>
            </div>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value={'All Pokemons'}>Order By</option>
                    <option value='A - Z'>A - Z</option>
                    <option value='Z - A'>Z - A</option>
                    <option value='Max'>Max Attack</option>
                    <option value='Min'>Min Attack</option>
                </select>
                <select onChange={e => handleOriginFilter(e)}>
                    <option value={'All Pokemons'}>All Pokemons</option>
                    <option value={'Existing'}>Existing</option>
                    <option value={'Created'}>Created</option>
                </select>
                <select onChange={e => handleTypeFilter(e)}>
                    <option value='All Types'>All Types</option>
                    {allTypes?.map(e => {
                        return (
                            <option value={e} key={e}>{e}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <Pages 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pages={pages}
                />
            </div>

            {currentPokemons && currentPokemons.map(e => 
                <Card 
                    key={e.id}
                    img={e.img}
                    name={e.name}
                    types={e.types}
                />
            )}
        </div>
    )
    
}
