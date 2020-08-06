import React from 'react';
import CanvasDrawComponent from '../../components/CanvasDrawComponent';
import CanvasControlPanel from './CanvasControlPanel';
import CanvasContextProvider from '../../contexts/CanvasContext'
import Navbar from './Navbar'
import { SPOFFSET, NAVOFFSET } from '../../utils/GlobalConstants'


const Freedrawing = () => {
  const localData = localStorage.getItem('fixedSidePanel');
  const fixedSidePanel = localData ? JSON.parse(localData) : false
  const sidePanelOffset = (fixedSidePanel) ? SPOFFSET : 0;
  return (
    <div>
      <CanvasContextProvider>
        <Navbar />
        <div id='floatContainer'>
          <CanvasDrawComponent id={1}
            canvasWidth={window.innerWidth - sidePanelOffset}
            canvasHeight={window.innerHeight - NAVOFFSET}
            hideGrid={false}
            gridColor='rgba(150,150,150,0.30)' /> {/* rgba(150,150,150,0.17)*/}
          <CanvasControlPanel />
        </div>
      </CanvasContextProvider>
    </div>
  );
}

export default {
  routeProps: {
    path: '/freedrawing',
    exact: true,
    component: Freedrawing,
  },
  name: 'Freedrawing',
};