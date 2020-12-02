import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <Router>
      <div className="App"> 
          <Route path="/" exact component={PokemonList}></Route>
          <Route exact path="/pokemon/:pokemonId" component={PokemonDetail}>
          </Route>
      </div>
    </Router>

  );
}

export default App;
