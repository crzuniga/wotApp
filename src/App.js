import React, { Component } from 'react'
import Header from './components/Header'
import MyRoutes from './components/PageRoutes';
import './css/App.css';

class App extends Component {
    state = {
        response: ''
    };

    render() {
        return (
            <div className="container">
                <Header />
                <p className="App-intro">{this.state.response}</p>
                < MyRoutes />
            </div>
        );

    }
}

export default App;