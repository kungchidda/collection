import React, { Component } from 'react'
import Amplify, { API } from 'aws-amplify'
import awsConfig from './aws-exports'
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import main from './pages/main';
import edit from './pages/edit';
import add from './pages/add';
import addSub from './pages/addSub';

Amplify.configure(awsConfig)

let apiName = 'collectionAPI'
let path = '/collection'

class App extends Component {
  
  render() {
  
    return (

      <div className="App">
        <Router>
          <Route exact path='/main' component={main} />
          <Route exact path='/edit/:id' component={edit} />
          <Route exact path='/add' component={add} />
          <Route exact path='/addSub/:id' component={addSub} />
        </Router>

  
      </div>
    )
  }
}

export default App