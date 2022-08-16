import './App.css';
import {Route, Switch} from "react-router-dom"
import LandingPage from './components/landingPage/landingPage';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Detalle from './components/detalle/Detalle';
import Create from './components/create/Create';
import Error from './components/error/Error';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route exact path="/home">
        <Nav/>
        <Home/>
      </Route>
      <Route exact path="/receta/:id">
        <Detalle/>
      </Route>
      <Route exact path="/create">
        <Nav/>
        <Create/>
      </Route>
      <Route exact component={Error}/>
      </Switch>
    </div>
  );
  
}

export default App;
