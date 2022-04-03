import React from "react";

export default function Card({img, name, types}) {
    return (
        <div>
            <img src={img} alt='img'  />
            <h3>{name}</h3>
            {types?.map(e => {
                return (
                       
                    <h5 key={e}>{e}</h5>  
                )}
            )}
        </div>
    )
}