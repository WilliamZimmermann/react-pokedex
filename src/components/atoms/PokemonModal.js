import React from "react";
import { Modal } from "react-bootstrap";

export default class PokemonModal extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Pokemon!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Modal Body!</p>
                </Modal.Body>
            </Modal.Dialog>
        );
    }

}