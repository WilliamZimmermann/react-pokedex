import React from 'react';
import PokemonType from '../components/atoms/PokemonType';
import { Link } from "react-router-dom";
import PokemonCard from '../components/molecules/PokemonCard';

export default class PokemonDetail extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pokemon: props.location.state.pokemonDetail,
            pokemonEvolutions: [],
            isLoading: true
        }
    }

    /**
     * Get API Data for Pokemon Evolution
     */
    componentDidMount(){ 
        this.getApiData("https://pokeapi.co/api/v2/evolution-chain/");
    }

    getApiData(url){
        // Clean the list
        this.setState({pokemonEvolutions: {}});
        // Take evolution chain
        try{
            fetch(url + this.state.pokemon.id)
                .then(response => response.json())
                .then(data => this.setState({
                    pokemonEvolutions: data.chain, 
                    isLoading: false
                }));
        }
        catch(err){
            console.error(err);
        }
    }

    render(){
        console.log(this.state);

        const {pokemon, pokemonEvolutions, isLoading} = this.state;
        // While load the data, show a loading message
        if(isLoading){
            this.setState({isLoading: false});
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }

        const evolvesTo = pokemonEvolutions.evolves_to || [];

        return (
            <div className="pokemonDetail">
                <div className="container">
                    <div className="row">
                        <h1><Link to="/">Pokemon List</Link> / {pokemon.name}</h1>
                    </div>
                    <div className="row row-cols-1 row-cols-md-4">
                        <PokemonCard 
                            index={1}    
                            pokemonName={pokemon.name}
                            pokemonData={pokemon}
                        ></PokemonCard>
                    </div>
                    <div className="row">
                        <h1>Evolutions</h1>
                    </div>
                    <div className="row">
                        {evolvesTo.forEach((evolution, index) => 
                            <div className="col mb-3" key={'pokemonCard-' + index}>
                                <PokemonCard
                                    index={index}
                                    name={evolution.species.name}
                                    showSeeMoreButton={true}
                                ></PokemonCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}