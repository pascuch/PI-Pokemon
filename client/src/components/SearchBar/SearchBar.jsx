import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { searchByName } from "../../actions/actions";
import styles from './SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.filteredPokemons)
    const [input, setInput] = useState('')

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchByName(input))
    }

    return (
        <div className={styles.container}>
            <div className={styles.box} >
                <input className={styles.input} type='text' placeholder="Write full name" onChange={e => handleChange(e)}></input>
                <button className={styles.button} onClick={e => handleSubmit(e)}> Search </button>
            </div>
        </div>
    )
}