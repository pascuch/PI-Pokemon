import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, postPokemon } from "../../actions/actions";
import styles from './CreatePokemon.module.css'

function validate(input) {


    let errors = {};
    if(!input.name) { errors.name = 'Name is required' };
    if(input.height < 0 || input.height > 200){
        errors.height = 'Value must be between 0 and 200'
    };
    if(input.weight < 0 || input.weight > 200){
        errors.weight = 'Value must be between 0 and 200'
    };
    if(input.hp < 0 || input.hp > 200){
        errors.hp = 'Value must be between 0 and 200'
    };
    if(input.attack < 0 || input.attack > 200){
        errors.attack = 'Value must be between 0 and 200'
    };
    if(input.defense < 0 || input.defense > 200){
        errors.defense = 'Value must be between 0 and 200'
    };
    if(input.speed < 0 || input.speed > 200){
        errors.speed = 'Value must be between 0 and 200'
    };

    return errors
    
}

export default function CreatePokemon() {
    let navigate = useNavigate();

    const dispatch = useDispatch()
    const allTypes = useSelector(state => state.types)
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name:'',
        height: 0,
        weight: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        img: '',
        type: [],
    })

    useEffect(() => {
        if(!allTypes.length) dispatch(getAllTypes()) 
    }, []) 

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }

    function handleSelect(e) {
        e.preventDefault();
        if(!input.type.find(el => el === e.target.value) && e.target.value){
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })}

        e.target.value = ''
    }

    function handleDelete(el) {
        // e.preventDefault();
        setInput({
            ...input,
            type: input.type.filter(e => e !== el)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(input.name === '' || Object.keys(error).length !== 0) {
            alert('Please insert valid inputs')
        }
        else {
            dispatch(postPokemon(input))
            alert('POKEMON CREATED!')
            setInput({
                name:'',
                height: 0,
                weight: 0,
                hp: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                type: [],
            })
        
            navigate("/home", { replace: true });
        }
    }

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    
    return (
        <div className={styles.container}>
            <div>
                <Link to='/home'><button className={styles.button}>Back</button></Link>
                <div className={styles.form}>
                    <h2 className={styles.title}>Create your own Pokemon</h2>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Name*</label>
                                <input 
                                    className={styles.input}
                                    placeholder='Name is required'
                                    type='text'
                                    value={input.name}
                                    name='name'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {error.name && (<span className={styles.error}>{error.name}</span>)}
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Height</label>
                                <input
                                    className={styles.input}
                                    type='number'
                                    value={input.height}
                                    name='height'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {error.height && (<span className={styles.error}>{error.height}</span>)}
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Weight</label>
                                <input 
                                    className={styles.input}
                                    type='number'
                                    value={input.weight}
                                    name='weight'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {error.weight && (<span className={styles.error}>{error.weight}</span>)}
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>HP</label>
                                <input 
                                    className={styles.input}
                                    type='number'
                                    value={input.hp}
                                    name='hp'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {error.hp && (<span className={styles.error}>{error.hp}</span>)}
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Attack</label>
                                <input 
                                    className={styles.input}
                                    type='number'
                                    value={input.attack}
                                    name='attack'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {error.attack && (<span className={styles.error}>{error.attack}</span>)}
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Defense</label>
                                <input
                                    className={styles.input} 
                                    type='number'
                                    value={input.defense}
                                    name='defense'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {error.defense && (<span className={styles.error}>{error.defense}</span>)}
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Speed</label>
                                <input 
                                    className={styles.input}
                                    type='number'
                                    value={input.speed}
                                    name='speed'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {error.speed && (<span className={styles.error}>{error.speed}</span>)}
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Image</label>
                                <input 
                                    placeholder="Insert image URL"
                                    className={styles.input}
                                    type='text'
                                    value={input.img}
                                    name='img'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className={styles.boxContainer}>
                            <div className={styles.box}>
                                <label className={styles.label}>Types</label>
                                <select className={styles.select} name='types' onChange={e => handleSelect(e)}>
                                    <option value=''>Select type</option>
                                    {allTypes?.map(e => {
                                        return (
                                            <option 
                                            value={e} 
                                            key={e}
                                            >{capitalize(e)}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {input.type?.map(e => {
                                return (
                                    <div className={styles.selectedTypes} key={e}>
                                        <span>{capitalize(e)}</span>
                                        <button className={styles.stylesButton} onClick={() => handleDelete(e)}>X</button>
                                    </div>
                                )
                            })}
                        </div> 
                        <button className={styles.button} type="submit" >Create Pokemon</button>
                    </form>
                </div>
            </div>
        </div>
    )
}