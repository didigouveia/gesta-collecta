import React, { Component, createContext } from 'react';

export const CanvasContext = createContext();

class CanvasContextProvider extends Component {
  state = {
    onChange: null,
    loadTimeOffset: 5,
    backgroundColor: 'white', // #FFF
    lazyRadius: 3,
    brushRadius: 5,
    brushColor: "green", // #444
    catenaryColor: "#0a0302", // #0a0302
    // gridColor: "red", // rgba(150,150,150,0.17)
    // hideGrid: false,
    // canvasWidth: 400,
    // canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false    
  }
  
  
  render() {
    return (
      <CanvasContext.Provider 
        value={{ ...this.state}}
      >
        {this.props.children}
      </CanvasContext.Provider>
    );
  }
}

export default CanvasContextProvider;