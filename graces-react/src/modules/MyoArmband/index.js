import React from 'react';
// import M from 'materialize-css/dist/js/materialize.min.js';

// import CanvasDrawComponent from '../../components/CanvasDrawComponent';
// import CanvasControlPanel from './CanvasControlPanel';
// import CanvasContextProvider from '../../contexts/CanvasContext'
import Navbar from './Navbar'
// import { SPOFFSET, NAVOFFSET } from '../../utils/GlobalConstants'
// const Myo = require("myo");
// import Myo from 'myo'
import MyoControlPanel from './MyoControlPanel'
import MyoDataDisplay from './MyoDataDisplay';
import MyoContextProvider from './MyoContext';

const MyoArmband = () => {
  return (
    <div>
      <Navbar />
      <div id='floatContainer'>
        <MyoContextProvider>
          <MyoDataDisplay />
          <MyoControlPanel />
        </MyoContextProvider>
      </div>
    </div>
  );
}

export default {
  routeProps: {
    path: '/myoarmband',
    exact: true,
    component: MyoArmband,
  },
  name: 'MyoArmband',
};