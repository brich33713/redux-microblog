import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Nav from './Nav'
import NewPost from './NewPost'
import Post from './Post'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/new"><NewPost /></Route>
          <Route exact path="/edit/:id"><NewPost /></Route>
          <Route exact path="/:id"><Post /></Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
