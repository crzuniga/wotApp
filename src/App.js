import React, { Component } from 'react';
import Header from './components/Header';
import MyRoutes from './components/PageRoutes';
import './css/app.css';

class App extends Component {
    state = {
      response: '',
    };

    render() {
      const { response } = this.state;
      return (
        <div className="container main-body">
          <Header />
          <p className="App-intro">{response}</p>
          <MyRoutes />
        </div>
      );
    }
}

export default App;