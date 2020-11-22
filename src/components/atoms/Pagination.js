import React from 'react';


export default class Pagination extends React.Component{
    constructor(props){
        super(props);

        this.state =  {
            total: 0,
            previousPage: "",
            nextPage: "",
            maxItemsPage: 0,
        }
    }

    render(){
        return (
            <div className="paginationContainer">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active" aria-current="page">
                        <span className="page-link">
                            2
                            <span className="sr-only">(current)</span>
                        </span>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}