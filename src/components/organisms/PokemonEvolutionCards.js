import React from 'react';
import PokemonType from '../atoms/PokemonType';
import { Link } from "react-router-dom";

export default class PokemonEvolutionCards extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pokemon: {},
            isLoading: false,
        }
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        // Take pokemon ID to do the API search
        try{
            fetch(this.props.pokemonApiUrl)
                .then(response => response.json())
                .then(data => this.setState({pokemon: data, isLoading: false}));
        }
        catch(err){
            console.error(err);
        }
    }

    render(){
        const {pokemon, isLoading} = this.state;

        // While load the data, show a loading message
        if(isLoading){
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }
        let pokemonImage = "";
        let imageDescription = "No image available for Pokemon " + pokemon.name;

        try{
            pokemonImage = pokemon.sprites.front_default;
            imageDescription = "Front image of Pokemon named " + pokemon.name;
        }
        catch(error){
            console.log("Failed to get Pokemon image: ", error);
        }

        const types = pokemon.types || [];

        return (
            <div className="pokemonCard">
                <div className="card">
                    <img src={pokemonImage} width="100px" className="rounded mx-auto d-block" alt={imageDescription}/>
                    <div className="card-body">
                        <h5 className="card-title">{pokemon.name}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" key={'type-' + this.props.index}><strong>Type:</strong> 
                            {types.map(type => 
                            <PokemonType pokemonType={type.type.name}></PokemonType>
                            )}
                        </li>
                        <li className="list-group-item" key={'experience-' + this.props.index}><strong>Experience:</strong> {pokemon.base_experience}</li>
                        <li className="list-group-item" key={'weight-' + this.props.index}><strong>Weight:</strong> {pokemon.height}</li>
                        <li className="list-group-item" key={'height-' + this.props.index}><strong>Height:</strong> {pokemon.weight}</li>
                        <Link to={{
                                    pathname: `pokemon/` + pokemon.id,
                                    state: { pokemonDetail: pokemon }
                                }} 
                            className="btn btn-primary" >See More</Link>
                    </ul>
                </div>
            </div>
        );
    }
    
}