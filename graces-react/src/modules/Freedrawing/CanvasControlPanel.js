import React, { useContext, useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { CanvasContext } from './CanvasContext';
import { CompactPicker } from 'react-color';
import { Switch } from 'react-materialize';

const CanvasControlPanel = () => {
  const brushRadiusRef = useRef(null);
  const lazyRadiusRef = useRef(null);
  const loadTimeOffsetRef = useRef(null);
  const selectRef = useRef(null);
  useEffect(() => {
    M.Range.init(brushRadiusRef.current);
    M.Range.init(lazyRadiusRef.current);
    M.Range.init(loadTimeOffsetRef.current);
    M.FormSelect.init(selectRef.current);
  });

  const {
    brushColor, brushRadius, lazyRadius,
    /*catenaryColor,*/ hideInterface, backgroundColor,
    handleBrushColor, handleBackgroundColor, /*handleCatenaryColor,*/
    handleBrushRadius, handleLazyRadius, handleInterface,
    handleLoadTimeOffset, loadTimeOffset,
    loadButtonAvail, clearCanvas, undoCanvas, saveCanvas,
    loadCanvas, clearGesture, handleForm, undoButtonAvail,
    sampleName, subjectID, attemptNb,
    setSampleName, setSubjectID, setAttemptNb,
    deviceName, setDeviceName
  } = useContext(CanvasContext);

  return (
    <div id="slide-out" className="sidenav  blue lighten-5">

      <div className="canvasPanelElem">
        <label className="sidePanelLabel" >Gesture Sample Info</label>

        <div className="row" /*style={{ marginBottom: '0px' }}*/>
          <form id="drawForm" onSubmit={handleForm} className="col s12">

            <div className="row ">
              <div className="input-field col s12 fixInputMargin">
                <select id="mode" ref={selectRef}>
                  <option value="mouse" defaultValue>Mouse</option>
                  <option value="finger">Finger</option>
                  <option value="pen">Pen</option>
                </select>
                <label>Select Modality</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 fixInputMargin">
                <input id="device_name" type="text" className="validate" required
                  value={deviceName} onChange={(e) => setDeviceName(e.target.value)}
                />
                <label htmlFor="device_name">Device Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 fixInputMargin">
                <input id="gesture_sample" type="text" className="validate" required
                  value={sampleName} onChange={(e) => setSampleName(e.target.value)}
                />
                <label htmlFor="gesture_sample">Gesture Sample Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 fixInputMargin">
                <input id="subject" type="number" min="0" className="validate" required
                  value={subjectID} onChange={(e) => setSubjectID(e.target.value)}
                />
                <label htmlFor="subject">Subject ID</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 fixInputMargin">
                <input id="attemptNb" type="number" min="0" className="validate" required
                  value={attemptNb} onChange={(e) => setAttemptNb(e.target.value)}
                />
                <label className="active" htmlFor="attemptNb">Attempt #</label>
              </div>
            </div>

          </form>
        </div>

      </div>

      <div className="canvasPanelElem">
        <div id="gestureFunctionsLabel"><label className="sidePanelLabel" >Gesture Sample Functions</label></div>

        <div className="buttonRow row">
          <div className="col s2"></div>
          <button className={"waves-effect waves-light btn-small red col s8 " + undoButtonAvail}
            onClick={undoCanvas}
          >Undo stroke</button>
        </div>

        <div className="buttonRow row">
          <div className="col s1"></div>
          <button className="waves-effect waves-light btn-small col s4"
            onClick={saveCanvas}
          >Save</button>
          <div className="col s2"></div>
          <button className={"waves-effect waves-light btn-small col s4 " + loadButtonAvail}
            onClick={loadCanvas}
          >Load</button>
        </div>

        <div className="buttonRow row">
          <label>Load Time Offset</label>
          <div>
            <p className="range-field">
              <input type="range" ref={loadTimeOffsetRef} min={0} max={15}
                onChange={handleLoadTimeOffset} value={loadTimeOffset}
              />
            </p>
          </div>
        </div>

        <div className="buttonRow row">
          <button className="waves-effect waves-light btn-small col s8 offset-s2 red"
            onClick={clearCanvas}
          >Clear canvas</button>
        </div>

        <div className="buttonRow row">
          <div className="col s1"></div>
          <button className="waves-effect waves-light btn-small col s10 red"
            onClick={clearGesture}
          >Clear saved gesture</button>
        </div>

        <div className="row">
          <button
            className={"waves-effect waves-light btn-small col s12 " + loadButtonAvail}
            name="submit" form="drawForm"
          >
            Submit saved gesture
          </button>
        </div>

        <div className="row fixRowMargin">
          <button type="submit" name="download" form="drawForm"  /*onClick={handleDownload}*/
            className={"waves-effect waves-light btn-small col s12 " + loadButtonAvail}>
            Download saved gesture
          </button>
        </div>

      </div>

      {/* <div className="canvasPanelElem">
        <label className="sidePanelLabel" >Catenary Color</label>
        <CompactPicker id='catenaryColorID'
          color={catenaryColor}
          onChangeComplete={handleCatenaryColor}
        />
      </div> */}

      <div className="canvasPanelElem">
        <label className="sidePanelLabel" >Brush Radius</label>
        <div>
          <p className="range-field">
            <input type="range" ref={brushRadiusRef} min={1} max={30}
              onChange={handleBrushRadius} value={brushRadius}
            />
          </p>
        </div>
      </div>

      <div className="canvasPanelElem">
        <label className="sidePanelLabel" >Lazy Radius</label>
        <div>
          <p className="range-field">
            <input type="range" ref={lazyRadiusRef} min={1} max={30}
              onChange={handleLazyRadius} value={lazyRadius}
            />
          </p>
        </div>
      </div>

      <div className="canvasPanelElem">
        <label className="sidePanelLabel" >Brush Color</label>
        <CompactPicker id='brushColorID'
          color={brushColor}
          onChangeComplete={handleBrushColor}
        />
      </div>

      <div className="canvasPanelElem">
        <label className="sidePanelLabel" >Background Color</label>
        <CompactPicker id='backgroundColorID'
          color={backgroundColor}
          onChangeComplete={handleBackgroundColor}
        />
      </div>



      <div className="canvasPanelElem">
        <label className="sidePanelLabel" >Brush Interface</label>
        <Switch
          id="interfaceSwitch"
          offLabel="Hide"
          onChange={handleInterface}
          onLabel="Show"
          checked={!hideInterface}
        />
      </div>


    </div>
  );
}

export default CanvasControlPanel;