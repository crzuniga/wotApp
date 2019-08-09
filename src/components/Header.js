import React from 'react';

const Header = () => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <a className="my-0 mr-md-auto" href="/">
      <img src="/images/logo.png" alt="logo" />
    </a>
    <nav className="my-2 my-md-0 mr-md-3">
      <a className="p-2" href="/">My Workouts</a>
      <a className="p-2" href="/history">
      History
      </a>
      <img alt="login" src="/images/login.png" />
      <label htmlFor="test"> John Doe </label>
    </nav>
  </div>
);

export default Header;
