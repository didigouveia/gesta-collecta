import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import { CanvasContext } from "../contexts/CanvasContext";

class CanvasDrawComponent extends Component {
  static contextType = CanvasContext;

  componentDidMount() {
    // window.addEventListener("resize", this.update);
    // this.update();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.update);
  }

  render() {
    const {
      brushColor, brushRadius, lazyRadius,
      catenaryColor, hideInterface, disabled,
      loadTimeOffset, immediateLoading, backgroundColor,
      getRef, onChange, onPointerMove, onPointerDown,
      onPointerUp, onPointerLeave } = this.context;
    const { canvasWidth, canvasHeight,
      gridColor, hideGrid } = this.props;
    return (
      <div id='canvasDraw'
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        className='blue lighten-4'
      >
        <CanvasDraw
          onChange={onChange}
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
          ref={getRef}
        />
      </div>
    )
  }
}

export default CanvasDrawComponent

// this.saveableCanvas.getSaveData()
