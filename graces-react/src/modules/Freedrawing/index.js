import React from 'react';
import CanvasDrawComponent from '../../components/CanvasDrawComponent';
import CanvasControlPanel from './CanvasControlPanel';
import CanvasContextProvider from '../../contexts/CanvasContext'
import Navbar from './Navbar'

const Freedrawing = () => {
  const localData = localStorage.getItem('fixedSidePanel');
  const fixedSidePanel = localData ? JSON.parse(localData) : false
  const sidePanelOffset = (fixedSidePanel) ? 300 : 0;
  return (
    <div>
      <CanvasContextProvider>
        <Navbar />
        <div id='fdContainer'>
          <CanvasDrawComponent id={1}
            canvasWidth={window.innerWidth - sidePanelOffset}
            canvasHeight={window.innerHeight - 71}
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