import './App.css';
import {Route} from "react-router-dom"
import LandingPage from './components/landingPage/landingPage';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Detalle from './components/detalle/Detalle';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/home">
        <Nav/>
        <Home/>
      </Route>
      <Route path="/receta/:id">
        <Detalle/>
      </Route>
    </div>
  );
  
}

export default App;
