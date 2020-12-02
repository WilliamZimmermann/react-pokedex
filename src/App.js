import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Pokemondetail from './pages/PokemonDetail';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <div className="App"> 
      <Router>
          <Route path="/">
            <PokemonList></PokemonList>
          </Route>
          <Route path="/pokemon/:pokemonId">
            <PokemonDetail></PokemonDetail>
          </Route>
      </Router>
    </div>
  );
}

export default App;
