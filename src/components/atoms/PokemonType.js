import React from "react";

export default class PokemonType extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <span className="badge badge-pill badge-info">{this.props.pokemonType}</span>
        );
    }

}