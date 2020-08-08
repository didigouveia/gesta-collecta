import React, { useContext, useEffect } from 'react';
// import { lockingPolicy } from 'myo';
import { MyoContext } from './MyoContext';
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

  const {
    setName, sampleName, subjectID,
    setSetName, setSampleName, setSubjectID,
    handleDownload
  } = useContext(MyoContext);
  return (
    <div className="sidePanel blue lighten-5">

      <div className="sidePanelElem">
        <label className="sidePanelLabel" >Gesture Sample Info</label>

        <div className="row">
          <form onSubmit={handleDownload} className="col s12">

            <div className="row">
              <div className="input-field col s12 fixRowMargin">
                <input id="gesture_set" type="text" className="validate" required
                  value={setName} onChange={(e) => setSetName(e.target.value)}
                />
                <label htmlFor="gesture_set">Gesture Set Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 fixRowMargin">
                <input id="gesture_sample" type="text" className="validate" required
                  value={sampleName} onChange={(e) => setSampleName(e.target.value)}
                />
                <label htmlFor="gesture_sample">Gesture Sample Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 fixRowMargin">
                <input id="subject" type="number" className="validate" required
                  value={subjectID} onChange={(e) => setSubjectID(e.target.value)}
                />
                <label htmlFor="subject">Subject ID</label>
              </div>
            </div>

            <div className="row">
              <button type="submit" id="MyoDownloadButton" className="input-field waves-effect waves-light btn-small col s12 disabled">
                Download gesture sample
                </button>
            </div>

          </form>
        </div>

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