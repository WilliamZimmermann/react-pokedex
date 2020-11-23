import React from 'react';
import Pagination from '../components/atoms/Pagination.js';
import PokemonCard from '../components/atoms/PokemonCard.js';
import { connect } from "react-redux";

class PokemonList extends React.Component{

    // Define the max Pokemons per page to be show
    maxItemsPage = 12;


    constructor(props){
        super(props);

        this.state = {
            pokemons: [],
            next: '',
            previous: '',
            count: 0,
            isLoading: false,
        }
    }

    /**
     * Get all Pokemons
     */
    componentDidMount(){
        // Take all pokemons and paginate it
        try{
            fetch('https://pokeapi.co/api/v2/pokemon?limit='+this.maxItemsPage)
                .then(response => response.json())
                .then(data => this.setState({
                    pokemons: data.results, 
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    isLoading: false
                }));
        }
        catch(err){
            console.error(err);
        }
    }

    render(){
        const {pokemons, next, previous, count, isLoading} = this.state;
        
        // While load the data, show a loading message
        if(isLoading){
            return (
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            );
        }

        return (
            <div className="pokemonList">
                <div class="container">
                    <div classname="row">
                        <h1>Pokémon's Library</h1>
                        <small className="text-muted">Know more about <strong>{count}</strong> Pokémons and their habits</small>
                    </div>
                    <div className="row">
                        <Pagination
                            total={count}
                            previousPage={previous}
                            next={next}
                            maxItemsPage={this.maxItemsPage}
                        ></Pagination>
                    </div>
                    <div className="row row-cols-1 row-cols-md-4">
                        {pokemons.map(pokemon => 
                            <div className="col mb-3">
                                <PokemonCard
                                    name={pokemon.name}
                                    pokemonApiUrl={pokemon.url}
                                ></PokemonCard>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <Pagination
                            total={count}
                            previousPage={previous}
                            next={next}
                            maxItemsPage={this.maxItemsPage}
                        ></Pagination>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    {  }
)(PokemonList);
  