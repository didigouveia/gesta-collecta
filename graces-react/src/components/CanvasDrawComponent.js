import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import { CanvasContext } from "../contexts/CanvasContext";

class CanvasDrawComponent extends Component {
  static contextType = CanvasContext;
  state = { 
    canvasWidth: parseInt(this.props.canvasWidth),
    canvasHeight: parseInt(this.props.canvasHeight),
    gridColor: this.props.gridColor,
    hideGrid: this.props.hideGrid,
    canvas: null,
    saveData: ""
  };

  componentDidMount() {
    // window.addEventListener("resize", this.update);
    // this.update();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.update);
  }

  

  onPointerMove = (e) => {
    // const canvas = this.state.canvas;
    // if (canvas.isPressing) {
      // console.log(e)
      // console.log(e.clientX, e.clientY, Date.now())
    // }
  }

  onPointerDown = (e) => {
    // console.log(this.props);

    // console.log('pointerDown')
    // console.log(e.clientX, e.clientY, Date.now())
  }

  // update = () => {
  //   this.setState({
  //     height: window.innerHeight,
  //     width: window.innerWidth
  //   });
  // };

  getRef = (canvasDraw) => {
    this.setState({
      canvas: canvasDraw
    })
  }
  saveDrawing = () => {
    this.setState({
      saveData: this.state.canvas.getSaveData()
    })
  }

  render() {
    const { brushColor, brushRadius, lazyRadius, 
            catenaryColor, hideInterface, disabled,
            loadTimeOffset, immediateLoading, backgroundColor} = this.context;
    const { canvasWidth, canvasHeight, 
            gridColor, hideGrid, canvas, saveData} = this.state;
    return (
      <div id='canvasDraw'
        onPointerMove={this.onPointerMove}
        onPointerDown={this.onPointerDown}
        className='blue lighten-4'        
      >
        <CanvasDraw
          // onChange={() => console.log(this.state.canvas)}
          backgroundColor={backgroundColor}
          brushColor={brushColor}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          brushRadius={brushRadius}
          lazyRadius={lazyRadius}
          catenaryColor={catenaryColor}
          gridColor={gridColor}
          hideGrid={hideGrid}
          hideInterface={hideInterface}
          disabled={disabled}
          loadTimeOffset={loadTimeOffset}
          immediateLoading={immediateLoading}
          ref={this.getRef}
        />
        <button onClick={() => {canvas.clear()}}>Clear</button>
        <button onClick={() => {canvas.undo()}}>Undo</button>
        <button onClick={() => {console.log(canvas)}}>Log Canvas</button>
        <button onClick={this.saveDrawing}>Save</button>
        <button onClick={() => {canvas.loadSaveData(saveData)}}>Load</button>

      </div>
    )
  }
}

export default CanvasDrawComponent

// this.saveableCanvas.getSaveData()
