import React, { useContext, useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { CanvasContext } from '../contexts/CanvasContext';
import { CompactPicker } from 'react-color';
import { Switch } from 'react-materialize';

const CanvasControlPanel = () => {
  const brushRadiusRef = useRef(null);
  const lazyRadiusRef = useRef(null);
  const loadTimeOffsetRef = useRef(null);
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      const sidenavElems = document.querySelectorAll('.sidenav');
      const options = {
        edge: 'right'
      }
      M.Sidenav.init(sidenavElems, options);
    });
    M.Range.init(brushRadiusRef.current);
    M.Range.init(lazyRadiusRef.current);
    M.Range.init(loadTimeOffsetRef.current);
  });

  const {
    brushColor, brushRadius, lazyRadius,
    catenaryColor, hideInterface, backgroundColor,
    handleBrushColor, handleBackgroundColor, handleCatenaryColor,
    handleBrushRadius, handleLazyRadius, handleInterface,
    handleLoadTimeOffset, loadTimeOffset,
    loadButtonAvail, clearCanvas, undoCanvas, saveCanvas,
    loadCanvas, clearGesture, downloadGesture, undoButtonAvail
  } = useContext(CanvasContext);

  return (
    <div>
      <div id="slide-out" className="sidenav sidenav-fixed blue lighten-5">

        <div className="sidenavElem">
          <label className="sidenavLabel" >Catenary Color</label>
          <CompactPicker id='catenaryColorID'
            color={catenaryColor}
            onChangeComplete={handleCatenaryColor}
          />
        </div>

        <div className="sidenavElem">
          <label className="sidenavLabel" >Background Color</label>
          <CompactPicker id='backgroundColorID'
            color={backgroundColor}
            onChangeComplete={handleBackgroundColor}
          />
        </div>

        <div className="sidenavElem">
          <label className="sidenavLabel" >Brush Color</label>
          <CompactPicker id='brushColorID'
            color={brushColor}
            onChangeComplete={handleBrushColor}
          />
        </div>

        <div className="sidenavElem">
          <label className="sidenavLabel" >Brush Radius</label>
          <div>
            <p className="range-field">
              <input type="range" ref={brushRadiusRef} min={1} max={30}
                onChange={handleBrushRadius} value={brushRadius}
              />
            </p>
          </div>
        </div>

        <div className="sidenavElem">
          <label className="sidenavLabel" >Lazy Radius</label>
          <div>
            <p className="range-field">
              <input type="range" ref={lazyRadiusRef} min={1} max={30}
                onChange={handleLazyRadius} value={lazyRadius}
              />
            </p>
          </div>
        </div>

        <div className="sidenavElem">
          <label className="sidenavLabel" >Brush Interface</label>
          <Switch
            id="interfaceSwitch"
            offLabel="Hide"
            onChange={handleInterface}
            onLabel="Show"
            checked={!hideInterface}
          />
        </div>
        <div className="sidenavElem">
          <div id="gestureFunctionsLabel"><label className="sidenavLabel" >Gesture functions</label></div>

          <div className="buttonRow row">
            <div className="col s3"></div>
            <button className={"waves-effect waves-light btn-small col s6 " + undoButtonAvail}
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
                <input type="range" ref={loadTimeOffsetRef} min={0} max={6}
                  onChange={handleLoadTimeOffset} value={loadTimeOffset}
                />
              </p>
            </div>
          </div>

          <div className="buttonRow row">
            <div className="col s3"></div>
            <button className="waves-effect waves-light btn-small col s6 red"
              onClick={clearCanvas}
            >Clear canvas</button>
          </div>

          <div className="buttonRow row">
            <div className="col s1"></div>
            <button className="waves-effect waves-light btn-small col s10 red"
              onClick={clearGesture}
            >Clear saved gesture</button>
          </div>


          <div className="buttonRow row">
            <button className={"waves-effect waves-light btn-small col s12 " + loadButtonAvail}
              onClick={downloadGesture}
            >Download saved gesture</button>
          </div>

        </div>
      </div>

      <a href="/#" data-target="slide-out" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
    </div>
  );
}

export default CanvasControlPanel;