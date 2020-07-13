import React from 'react';
import CanvasDrawComponent from './CanvasDrawComponent';
import CanvasControlPanel from './CanvasControlPanel';
import CanvasContextProvider from '../contexts/CanvasContext'

const Freedrawing = (props) => {
  return (
    <div>
      <CanvasContextProvider>
        <CanvasControlPanel />
        <CanvasDrawComponent id={1}
          canvasWidth={800}
          canvasHeight={800}
          hideGrid={false}
          gridColor='rgba(150,150,150,0.30)' /> {/* rgba(150,150,150,0.17)*/}
      </CanvasContextProvider>
    </div>
  );
}

export default Freedrawing;