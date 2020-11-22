import React from 'react';

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
            fetch('https://pokeapi.co/api/v2/pokemon/1/')
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
            return <p>Loading ...</p>;
        }
        let pokemonImage = "";

        try{
            pokemonImage = pokemon.sprites.front_default;
            console.log("Pokemon Image: ", pokemonImage);
        }
        catch(error){
            console.log("Failed to get Pokemon image: ", error);
        }

        return (
            <div className="pokemonCard">
                <div className="card">
                    <img src={pokemonImage} className="card-img-top" alt="Some alternative Description"/>
                    <div className="card-body">
                        <h5 className="card-title">{pokemon.name}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Experience:</strong> {pokemon.base_experience}</li>
                        <li class="list-group-item"><strong>Weight:</strong> {pokemon.height}</li>
                        <li class="list-group-item"><strong>Height: {pokemon.weight}</strong></li>
                        <a href="#" className="btn btn-primary">See more</a>
                    </ul>
                </div>
            </div>
        );
    }
    
}