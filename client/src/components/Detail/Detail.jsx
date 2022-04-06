import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemonDetail } from "../../actions/actions";
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Detail.module.css';


export default function Detail(props) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPokemonDetail(id))
    }, [])

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    
    const pokemon = useSelector(state => state.pokemonDetail)
    
    
    return (
        <div className="App">
            <div className={styles.detail}>
                <div className={styles.main}>
                    <img width={200} height={200} src={pokemon.img} alt='img' />
                    <h1>{pokemon.name && capitalize(pokemon.name)}</h1>
                    <h4>(ID: {pokemon.id})</h4>
                </div>
                <div className={styles.typeTitle}>
                    <h3>- Types -</h3>
                    <div className={styles.types}>
                    {pokemon.types?.map(e => {
                            return (
                                <h4 value={e} key={e}>{capitalize(e)}</h4>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.statisticsTitle}>
                    <h3>- Statistics -</h3>
                    <div className={styles.statistics}>
                        <div>
                            <h4>Life: {pokemon.hp}</h4>
                            <h4>Strength: {pokemon.attack}</h4>
                        </div>
                        <div>
                            <h4>Defense: {pokemon.defense}</h4>
                            <h4>Speed: {pokemon.speed}</h4>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyTitle}>
                    <h3>- Body -</h3>
                    <div className={styles.body}>
                        <h4>Height: {pokemon.height}</h4>
                        <h4>Weight: {pokemon.weight}</h4>
                    </div>
                </div>
            </div>
            <button className={styles.button} onClick={() => navigate(-1)}>Back</button>
        </div>
    )

}