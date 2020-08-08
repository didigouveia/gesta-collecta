import React from 'react';
import Navbar from '../../components/Navbar';
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