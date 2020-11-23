import React from 'react';
import PokemonType from '../atoms/PokemonType';

export default class PokemonCard extends React.Component{

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
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            );
        }
        let pokemonImage = "";
        let imageDescription = "No image available for Pokemon " + pokemon.name;

        try{
            pokemonImage = pokemon.sprites.front_default;
            imageDescription = "Front image of Pokemon named " + pokemon.name;
            console.log("Pokemon Image: ", pokemonImage);
        }
        catch(error){
            console.log("Failed to get Pokemon image: ", error);
        }

        const types = pokemon.types || [];
        console.log("Types: ", types);

        return (
            <div className="pokemonCard">
                <div className="card">
                    <img src={pokemonImage} width="100px" className="rrounded mx-auto d-block" alt={imageDescription}/>
                    <div className="card-body">
                        <h5 className="card-title">{pokemon.name}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Type:</strong> 
                            {types.map(type => 
                            <PokemonType pokemonType={type.type.name}></PokemonType>
                            )}
                        </li>
                        <li class="list-group-item"><strong>Experience:</strong> {pokemon.base_experience}</li>
                        <li class="list-group-item"><strong>Weight:</strong> {pokemon.height}</li>
                        <li class="list-group-item"><strong>Height:</strong> {pokemon.weight}</li>
                        <a href="#" className="btn btn-primary">Open Card</a>
                    </ul>
                </div>
            </div>
        );
    }
    
}