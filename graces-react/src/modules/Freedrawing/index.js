import React from 'react';
import CanvasDrawComponent from '../../components/CanvasDrawComponent';
import CanvasControlPanel from './CanvasControlPanel';
import CanvasContextProvider from '../../contexts/CanvasContext'
import Navbar from './Navbar'

const Freedrawing = () => {
  return (
    <div>
      <CanvasContextProvider>
        <Navbar />
        <CanvasControlPanel />
        <CanvasDrawComponent id={1}
          canvasWidth={window.innerWidth - 300}
          canvasHeight={window.innerHeight - 70}
          hideGrid={false}
          gridColor='rgba(150,150,150,0.30)' /> {/* rgba(150,150,150,0.17)*/}
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