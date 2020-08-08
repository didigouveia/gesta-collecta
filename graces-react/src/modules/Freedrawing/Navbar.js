import React, { useEffect, useState, useContext } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
import { Switch } from 'react-materialize';
import { CanvasContext } from './CanvasContext';
import { SPOFFSET, NAVOFFSET } from '../../utils/GlobalConstants'

const Navbar = (props) => {
  const [fixedSidePanel, setSidePanel] = useState(() => {
    const localData = localStorage.getItem('fixedSidePanel');
    return localData ? JSON.parse(localData) : false
  });
  // const [sideNavInit, setSideNavInit] = useState(null);

  const handleSidePanel = () => {
    setSidePanel(!fixedSidePanel);
  }

  const { handleCanvasWidth, handleCanvasHeight/*, canvasWidth, canvasHeight*/ } = useContext(CanvasContext);
  useEffect(() => {
    const sidePanelElems = document.querySelectorAll('.sidenav');
    const options = {
      edge: 'right'
    }
    M.Sidenav.init(sidePanelElems, options)
    const sidePanelButtonElems = document.getElementsByClassName("sidePanelButton");
    const sidePanel = document.getElementById("slide-out");
    if (!fixedSidePanel) {
      for (let i = 0; i < sidePanelButtonElems.length; i++) {
        sidePanelButtonElems[i].style.visibility = 'visible';
      }
      sidePanel.classList.remove('sidePanel');
      sidePanel.classList.add('sidenav');
    } else {
      for (let i = 0; i < sidePanelButtonElems.length; i++) {
        sidePanelButtonElems[i].style.visibility = 'hidden';
      }
      sidePanel.classList.remove('sidenav');
      sidePanel.classList.add('sidePanel');
    }
    localStorage.setItem('fixedSidePanel', JSON.stringify(fixedSidePanel));

    const sidePanelOffset = (fixedSidePanel) ? SPOFFSET : 0;
    handleCanvasWidth(window.innerWidth - sidePanelOffset);
    handleCanvasHeight(window.innerHeight - NAVOFFSET);

    // console.log(canvasWidth, canvasHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixedSidePanel])



  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <div className="container">
          <Link to="/#" className="brand-logo center">GRACES</Link>
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