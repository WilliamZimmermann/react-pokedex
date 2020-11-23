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
                    <h3>Pokémon's Library</h3>
                    <small className="text-muted">Know more about <strong>{count}</strong> Pokémons and their habits</small>
                    <div className="row">
                        <ul className="list-group col-12">
                            {pokemons.map((pokemon, index) => 
                                <li className="list-group-item" key={index}><a href="{pokemon.url}">{pokemon.name}</a></li>
                            )}
                        </ul>
                    </div>
                    <div className="row">
                        <nav>
                            <ul className="pagination">
                                <li className={ previous ? 'page-item' : 'page-item disabled'}>
                                    <button className="page-link" onClick={this.previousPage.bind(this)}>Previous</button>
                                </li>
                                <li className={ next ? 'page-item' : 'page-item disabled'}>
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
  