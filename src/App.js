import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import Tasks from './components/Tasks.js';
import Logout from './components/Logout.js';
import { Switch, Route } from 'react-router-dom';


class App extends Component {

  render() {
    
    return (
     <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/tasks' component={Tasks}/>
        <Route exact path='/logout' component={Logout}/>

      </Switch>
    </div>
    );
  }
}

export default App;
