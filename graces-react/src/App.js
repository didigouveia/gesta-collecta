import React from 'react';
import CanvasDrawComponent from './components/CanvasDrawComponent'
import CanvasContextProvider from './contexts/CanvasContext';
import CanvasControlPanel from './components/CanvasControlPanel';

function App() {
  return (
    <div className="App">
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

export default App;
