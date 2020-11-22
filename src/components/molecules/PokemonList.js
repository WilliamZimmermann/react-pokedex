import React from 'react';
import PokemonCard from '../atoms/PokemonCard.js';

export default class PokemonList extends React.Component{
    render(){
        return (
            <div className="pokemonList">
                <div className="row row-cols-4">
                    <div className="col mb-4">
                        <PokemonCard
                            pokemonApiUrl="id"
                        ></PokemonCard>
                    </div>
                </div>
            </div>
        );
    }
}