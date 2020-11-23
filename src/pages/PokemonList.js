import React from 'react';
import PokemonCard from '../components/molecules/PokemonCard.js';
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
        this.getApiData("https://pokeapi.co/api/v2/pokemon");
    }

    getApiData(url){
        // Clean the list
        this.setState({pokemons: []});
        // Take all pokemons and paginate it
        try{
            fetch(url + "?limit="+this.maxItemsPage)
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

    /**
     * Go to next page
     */
    nextPage(){
        this.getApiData(this.state.next);
    }

    /**
     * Go to previous page
     */
    previousPage(){
        this.getApiData(this.state.previous);
    }

    render(){
        const {pokemons, next, previous, count, isLoading} = this.state;
        console.log(pokemons);
        // While load the data, show a loading message
        if(isLoading){
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }

        return (
            <div className="pokemonList">
                <div className="container">
                    <div className="row">
                        <h1>Pokémon's Library</h1>
                        <small className="text-muted">Know more about <strong>{count}</strong> Pokémons and their habits</small>
                    </div>
                    <div className="row row-cols-1 row-cols-md-4">
                        {pokemons.map((pokemon, index) => 
                            <div className="col mb-3" key={'pokemonCard-' + index}>
                                <PokemonCard
                                    index={index}
                                    name={pokemon.name}
                                    pokemonApiUrl={pokemon.url}
                                ></PokemonCard>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <nav>
                            <ul className="pagination">
                                <li key="previousBtn" className={ previous ? 'page-item' : 'page-item disabled'}>
                                    <button className="page-link" onClick={this.previousPage.bind(this)}>Previous</button>
                                </li>
                                <li key="nextBtn" className={ next ? 'page-item' : 'page-item disabled'}>
                                    <button className="page-link" onClick={this.nextPage.bind(this)}>Next</button>
                                </li>
                            </ul>
                        </nav>
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
  