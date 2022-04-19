import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPokemons, getAllTypes, filterByType, filterByOrigin, sortByName, filterBy99 } from "../../actions/actions";
import Card from "../Card/Card";
import CardsGrid from "../CardsGrid/CardsGrid";
import Pages from "../Pages/Pages";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Home.module.css';
import logo from './logo.png'

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.filteredPokemons)
    const allTypes = useSelector(state => state.types)
    // const navigate = useNavigate()
    // const [back, setBack] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [order, setOrder] = useState('')
    const lastPokemon = currentPage * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);

    function pages(number) {
        setCurrentPage(number)
    }

    useEffect(() => {
        // console.log('Mount: ', allPokemons.length)
        // console.log('Mount: ', allTypes.length)

        if(!allPokemons.length && !allTypes.length) 
        {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
        }
    }, [])    

    function handleReload(e) {
        e.preventDefault();
        dispatch(getAllPokemons());
    }

    function handleTypeFilter(e) {
        e.preventDefault();
        dispatch(filterByType(e.target.value))
        setCurrentPage(1)
    }

    function handleOriginFilter(e) {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value))
        setCurrentPage(1)
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1)
        setOrder(`Sorted by ${e.target.value}`)
    }

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    // console.log(allPokemons)

    return (
        <div className={styles.home}>
            <div className={styles.nav}>
                <div>
                    <Link to='/'>
                        <img className={styles.logo} src={logo} />
                    </Link>
                </div>
              
                <div className={styles.container}>
                    <Link to='/create'><button className={styles.create} >Create</button></Link>
                <div>
                    <select className={styles.sort} onChange={e => handleSort(e)}>
                        <option value={'All Pokemons'}>Order By</option>
                        <option value='A - Z'>A - Z</option>
                        <option value='Z - A'>Z - A</option>
                        <option value='Max'>Max Attack</option>
                        <option value='Min'>Min Attack</option>
                    </select>
                    <select className={styles.origin} onChange={e => handleOriginFilter(e)}>
                        <option value={'All Pokemons'}>All Pokemons</option>
                        <option value={'Existing'}>Existing</option>
                        <option value={'Created'}>Created</option>
                    </select>
                    <select className={styles.type} onChange={e => handleTypeFilter(e)}>
                        <option value='All Types'>All Types</option>
                        {allTypes?.map(e => {
                            return (
                                <option value={e} key={e}>{capitalize(e)}</option>
                            )
                        })}
                    </select>
                    </div>
                    <button className={styles.reload} onClick={e => handleReload(e)}>Reset</button>
                </div>
                
                    <SearchBar />
                    
                <Pages 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pages={pages}
                />
            
            </div>
            

            <CardsGrid currentPokemons={currentPokemons} />

        </div>
    )
    
}
