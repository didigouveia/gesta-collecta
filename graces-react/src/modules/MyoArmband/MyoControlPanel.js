import React, { /*useContext,*/ useEffect } from 'react';
// import M from 'materialize-css/dist/js/materialize.min.js';
// import { CanvasContext } from '../../contexts/CanvasContext';
// import { CompactPicker } from 'react-color';
// import { Switch } from 'react-materialize';

const MyoControlPanel = () => {


  useEffect(() => {

  }, []);

  // const {
  //   brushColor, brushRadius, lazyRadius,
  //   catenaryColor, hideInterface, backgroundColor,
  //   handleBrushColor, handleBackgroundColor, handleCatenaryColor,
  //   handleBrushRadius, handleLazyRadius, handleInterface,
  //   handleLoadTimeOffset, loadTimeOffset,
  //   loadButtonAvail, clearCanvas, undoCanvas, saveCanvas,
  //   loadCanvas, clearGesture, downloadGesture, undoButtonAvail
  // } = useContext(CanvasContext);

  return (
    <div className="sidePanel blue lighten-5">

      <div className="sidePanelElem">
        <label className="sidePanelLabel" >Catenary Color</label>

      </div>

      <div className="sidePanelElem">
        <label className="sidePanelLabel" >Background Color</label>

      </div>

      <div className="sidePanelElem">
        <label className="sidePanelLabel" >Brush Color</label>

      </div>

      <div className="sidePanelElem">
        <label className="sidePanelLabel" >Brush Interface</label>

      </div>

    </div>
  );
}

export default MyoControlPanel;