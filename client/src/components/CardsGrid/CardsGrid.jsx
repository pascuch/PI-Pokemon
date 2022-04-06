import Card from "../Card/Card";
import styles from './CardsGrid.module.css'

export default function CardsGrid({currentPokemons}) {

    return (
        <div className={styles.div}>
            {         
                currentPokemons && currentPokemons.map(e => {
                    if(currentPokemons[0].hasOwnProperty('error')) return alert(currentPokemons[0].error);
                    else return (
                    <Card 
                        key={e.id}
                        id={e.id}
                        img={e.img}
                        name={(e.name)}
                        types={(e.types)}
                    />
                    )})
            }
        </div>
    )
}