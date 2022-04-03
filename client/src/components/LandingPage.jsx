import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className='App'>
            <h1>THE POKEMON FEST</h1>
            <Link to={'/home'}>
                <button>JOIN THE PARTY</button>
            </Link>
        </div>
    )
}