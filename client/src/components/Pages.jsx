import React from "react";

export default function Pages({pokemonsPerPage, allPokemons, pages}) {
    const pageNumbers = []

    for(let i=1; i<allPokemons/pokemonsPerPage + 1; i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul>
                {pageNumbers?.map(e => {
                    return (
                        <li className="App" key={e}>
                            <a onClick={() => pages(e)}>{e}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}