import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, postPokemon } from "../../actions/actions";

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
        dispatch(getAllTypes())
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
        if(!input.type.find(el => el === e.target.value)){
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })}
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
        }
        

    }

    
    return (
        <div className="App">
            <Link to='/home'><button>Back</button></Link>
            <h1>Create your own Pokemon</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name*: </label>
                    <input 
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)}
                    />
                    {error.name && (<span>{error.name}</span>)}
                </div>
                <div>
                    <label>Height: </label>
                    <input 
                        type='number'
                        value={input.height}
                        name='height'
                        onChange={e => handleChange(e)}
                    />
                    {error.height && (<span>{error.height}</span>)}
                </div>
                <div>
                    <label>Weight: </label>
                    <input 
                        type='number'
                        value={input.weight}
                        name='weight'
                        onChange={e => handleChange(e)}
                    />
                    {error.weight && (<span>{error.weight}</span>)}
                </div>
                <div>
                    <label>HP: </label>
                    <input 
                        type='number'
                        value={input.hp}
                        name='hp'
                        onChange={e => handleChange(e)}
                    />
                    {error.hp && (<span>{error.hp}</span>)}
                </div>
                <div>
                    <label>Attack: </label>
                    <input 
                        type='number'
                        value={input.attack}
                        name='attack'
                        onChange={e => handleChange(e)}
                    />
                    {error.attack && (<span>{error.attack}</span>)}
                </div>
                <div>
                    <label>Defense: </label>
                    <input 
                        type='number'
                        value={input.defense}
                        name='defense'
                        onChange={e => handleChange(e)}
                    />
                    {error.defense && (<span>{error.defense}</span>)}
                </div>
                <div>
                    <label>Speed: </label>
                    <input 
                        type='number'
                        value={input.speed}
                        name='speed'
                        onChange={e => handleChange(e)}
                    />
                    {error.speed && (<span>{error.speed}</span>)}
                </div>
                <div>
                    <label>ImageURL: </label>
                    <input 
                        type='text'
                        value={input.img}
                        name='img'
                        onChange={e => handleChange(e)}
                    />
                    {error.speed && (<span>{error.speed}</span>)}
                </div>
                <div>
                    <label>Types: </label>
                    <select name='types' onChange={e => handleSelect(e)}>
                        <option>Select type</option>
                        {allTypes?.map(e => {
                            return (
                                <option 
                                value={e} 
                                key={e}
                                >{e}</option>
                            )
                        })}
                    </select>
                    {input.type?.map(e => {
                        return (
                            <div key={e}>
                                <span>{e}</span>
                                <button onClick={() => handleDelete(e)}>X</button>
                            </div>
                        )
                    })}
                </div> 
                <button type="submit">Create Pokemon</button>
            </form>
        </div>
    )
}