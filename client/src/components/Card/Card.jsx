import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css';

export default function Card({img, name, types, id}) {
    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    return (
        <Link className={styles.card} to={`/pokemon/${id}`}>
            <div >
                <img width={150} height={150} src={img} alt='img' />
                <h3>{capitalize(name)}</h3>
                <div className={styles.types}>
                    {types?.map(e => {
                        return (
                            
                            <h5 key={e}>{capitalize(e)}</h5>  
                        )}
                    )}
                </div>
            </div>
        </Link>
    )
}