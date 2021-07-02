
import './App.css';
import { Navbar } from './component/layout/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Index } from './component/layout/Index.js';
import { Lyrics } from './component/tracks/Lyrics';
import {Contexter} from './Contexter'

function App() {


  return (
    <Contexter>
    <Router>
      <>
      <Navbar/>
      
        <div className='container'>
          <Switch>
            <Route path='/' exact component = {Index}/>
            <Route path='/lyrics/track/:id' exact component = {Lyrics}/>
          </Switch>
        </div>
      </>
    </Router>
    </Contexter>
  );
}

export default App;
