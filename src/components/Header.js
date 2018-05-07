import React from 'react'
import logo from './../images/logo.png'
import login from './../images/login.png'


export default class Header extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                <img src={logo} className="my-0 mr-md-auto" alt="logo" />
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className='p-2' href='/'>
                    My Workouts</a>
                    <a className='p-2' href='/history'>
                    History
                    </a>
                    <img alt='login' src={login} /><label>John Doe </label>
                </nav>
            </div>
        )
    }
}