import React from 'react';

const Navbar = (props) => {
  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <div className="container">
          <a href="/#" className="brand-logo">GRACES</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li><a href="sass.html">Sass</a></li> */}
            <li><a href="/#">Contact</a></li>
            <li><a href="/#">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;