import './App.css';
import {Route} from "react-router-dom"
import LandingPage from './components/landingPage/landingPage';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage/>
      </Route>
    </div>
  );
  
}

export default App;
