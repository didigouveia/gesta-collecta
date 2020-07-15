import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
import { Switch } from 'react-materialize';

const Navbar = (props) => {
  const [fixedSidePanel, setSidePanel] = useState(() => {
    console.log('here');
    const localData = localStorage.getItem('fixedSidePanel');
    return localData ? JSON.parse(localData) : false
  });

  // const [fixedSidePanel, setSidePanel] = useState(false);

  const handleSidePanel = () => {
    setSidePanel(!fixedSidePanel);
  }

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      const sidePanelElems = document.querySelectorAll('.sidenav');
      const options = {
        edge: 'right'
      }
      M.Sidenav.init(sidePanelElems, options);
    });

    const sidePanelButtonElems = document.getElementsByClassName("sidePanelButton");
    if (!fixedSidePanel) {
      for (let i = 0; i < sidePanelButtonElems.length; i++) {
        sidePanelButtonElems[i].style.visibility = 'visible';
      }
    } else {
      for (let i = 0; i < sidePanelButtonElems.length; i++) {
        sidePanelButtonElems[i].style.visibility = 'hidden';
      }
    }
    localStorage.setItem('fixedSidePanel', JSON.stringify(fixedSidePanel));
  });



  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <div className="container">
          <Link to="/#" className="brand-logo left">GRACES</Link>
          <ul className="right">
            <li><Link to="#" data-target="slide-out"
              className="sidePanelButton sidenav-trigger show-on-large" style={{ 'visibility': 'visible' }}>
              <i className="sidePanelButton material-icons" style={{ 'visibility': 'visible' }}>menu</i></Link>
            </li>
            <li>
              <Switch
                id="sidePanelSwitch"
                offLabel="Hide"
                onChange={handleSidePanel}
                onLabel="Show"
                checked={fixedSidePanel}
              />
            </li>
            {/* <li><a href="sass.html">Sass</a></li>
            <li><a href="/#">Contact</a></li>
            <li><a href="/#">About</a></li> */}
            {/* <li><a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a></li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;