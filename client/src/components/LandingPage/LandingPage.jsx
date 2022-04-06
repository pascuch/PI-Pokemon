import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styles.landing}>
            <h1>THE POKEMON FEST</h1>
            <Link to={'/home'}>
                <button className={styles.button}><a>Join the party!</a></button>
            </Link>
        </div>
    )
}