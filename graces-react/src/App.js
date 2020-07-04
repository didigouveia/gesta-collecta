import React from 'react';
import CanvasDrawComponent from './components/CanvasDrawComponent'
import CanvasContextProvider from './contexts/CanvasContext';

function App() {
  return (
    <div className="App">  
    <CanvasContextProvider>
      <div>
      <CanvasDrawComponent 
        canvasWidth={300} 
        canvasHeight={300} 
        hideGrid={false} 
        gridColor='rgba(150,150,150,0.17)' />
        <p></p>
        </div>
        <div>
        <CanvasDrawComponent 
        canvasWidth={300} 
        canvasHeight={300} 
        hideGrid={false} 
        gridColor='rgba(150,150,150,0.17)' />
        <p></p>
        </div>
        <div>
        <CanvasDrawComponent 
        canvasWidth={300} 
        canvasHeight={300} 
        hideGrid={false} 
        gridColor='rgba(150,150,150,0.17)' />
        </div>
    </CanvasContextProvider> 
    </div>
  );
}

export default App;
