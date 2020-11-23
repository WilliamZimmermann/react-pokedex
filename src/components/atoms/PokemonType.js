import React from "react";

export default class PokemonType extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <span class="badge badge-pill badge-info">{this.props.pokemonType}</span>
        );
    }

}