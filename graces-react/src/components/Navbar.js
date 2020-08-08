import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <div className="container">
          <Link to="/#" className="brand-logo center">GRACES</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;