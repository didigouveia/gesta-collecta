import React, { useContext } from 'react';
import { MyoContext } from './MyoContext';

const MyoControlPanel = () => {

  const {
    sampleName, subjectID, attemptNb,
    setSampleName, setSubjectID, setAttemptNb,
    handleForm, undoStroke, clearGesture
  } = useContext(MyoContext);
  return (
    <div className="sidePanel blue lighten-5">

      <div className="myoPanelElem">
        <label className="sidePanelLabel" >Gesture Sample Info</label>

        <div className="row" /*style={{ marginBottom: '0px' }}*/>
          <form id="myoForm" onSubmit={handleForm} className="col s12">

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

      <div className="myoPanelElem">
        <label className="sidePanelLabel">Gesture Sample Functions</label>

        <div className="row" style={{ marginTop: '10px' }}>
          <div className="col s8 offset-s2">
            <button className="red waves-effect waves-light btn-small"
              style={{ width: '140px' }} onClick={undoStroke}>
              Undo stroke</button>
          </div>
        </div>

        <div className="row">

          <button className="red waves-effect waves-light btn-small col s12"
            onClick={clearGesture}>
            Clear gesture sample</button>

        </div>

        <div className="row fixRowMargin">
          <button type="submit" name="submit" form="myoForm"
            className="input-field waves-effect waves-light btn-small col s12 MyoDownloadButton disabled">
            Submit gesture sample
          </button>
        </div>

        <div className="row fixRowMargin">
          <button type="submit" name="download" form="myoForm"  /*onClick={handleDownload}*/
            className="input-field waves-effect waves-light btn-small col s12 MyoDownloadButton disabled">
            Download gesture sample
          </button>
        </div>

      </div>

    </div>
  );
}

export default MyoControlPanel;