import React from "react";
import styles from './Pages.module.css'

export default function Pages({pokemonsPerPage, allPokemons, pages}) {
    const pageNumbers = []

    for(let i=1; i<allPokemons/pokemonsPerPage + 1; i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className={styles.pagination}>
                {pageNumbers?.map(e => {
                    return (
                        <li className={styles.li} key={e} onClick={() => pages(e)}>
                            <a >{e}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}