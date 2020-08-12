import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Homepage = () => {
  const [setName, setSetName] = useState('');

  function handleForm(e) {
    e.preventDefault();
    console.log('handleForm');

    const MyoGestureSet = sessionStorage.getItem('MyoGestureSet');
    const DrawGestureSet = sessionStorage.getItem('DrawGestureSet');
    const zip = new JSZip();

    if (MyoGestureSet) {
      prepareMyoSet(zip, MyoGestureSet);
    }
    if (DrawGestureSet) {
      prepareDrawSet(zip, DrawGestureSet);
    }

    if (MyoGestureSet || DrawGestureSet) {
      zip.generateAsync({ type: "blob" })
        .then(function (blob) {
          saveAs(blob, `${setName}`);
        });
    }
  }

  return (
    <div>
      <Navbar />
      <div className='container blue accent-1 valign-wrapper' id='homepage'>
        <div id='dashcard' className="row" >
          <div className="col s12 m12">
            <div className="card-panel z-depth-5 center-align ">
              <div>
                <Link to={'/freedrawing'} className="waves-effect waves-light btn-large blue darken-2"
                  style={{ marginBottom: 1 + 'em', width: 200 + 'px' }}
                >Free drawing</Link>
              </div>
              <div>
                <Link to={'/myoarmband'} className="waves-effect waves-light btn-large blue darken-2"
                  style={{ marginBottom: 1 + 'em', width: 200 + 'px' }}
                >Myo Armband</Link>
              </div>

              <div className="row fixRowMargin" /*style={{ marginBottom: '0px' }}*/>
                <form id="gestureSetForm" onSubmit={handleForm} className="col s12">

                  <div className="row">
                    <div className="input-field col s12 fixInputMargin">
                      <input id="gesture_set" type="text" className="validate" required
                        value={setName} onChange={(e) => setSetName(e.target.value)}
                      />
                      <label htmlFor="gesture_set">Gesture Set Name</label>
                    </div>
                  </div>

                  <div className="row fixRowMargin">
                    <button
                      type="submit" form="gestureSetForm" id="GestureSetDownloadButton"
                      className="fixRowMargin input-field waves-effect waves-light 
                      btn-small col s12 blue darken-2">
                      Download gesture set
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function prepareMyoSet(zip, MyoGestureSetString) {
  const MyoGestureSet = JSON.parse(MyoGestureSetString);
  const myoFolder = zip.folder('MyoArmband');

  for (let i = 0; i < MyoGestureSet.length; i++) {
    const {
      sampleName, subjectID, attemptNb, orientGestSample,
      gyrosGestSample, accelGestSample
    } = MyoGestureSet[i];

    const padSubjectID = subjectID.toString().padStart(2, '0');
    const padAttemptNb = attemptNb.toString().padStart(2, '0');

    const accelFilename = `${padSubjectID}/${sampleName}/${sampleName}-acceleration-${padAttemptNb}.json`;
    const gyrosFilename = `${padSubjectID}/${sampleName}/${sampleName}-gyroscope-${padAttemptNb}.json`;
    const orientFilename = `${padSubjectID}/${sampleName}/${sampleName}-orientation-${padAttemptNb}.json`;
    console.log(accelFilename);

    myoFolder.file(accelFilename, JSON.stringify(accelGestSample, null, 2));
    myoFolder.file(gyrosFilename, JSON.stringify(gyrosGestSample, null, 2));
    myoFolder.file(orientFilename, JSON.stringify(orientGestSample, null, 2));
  }

}

function prepareDrawSet(zip, DrawGestureSetString) {
  const DrawGestureSet = JSON.parse(DrawGestureSetString);

  for (let i = 0; i < DrawGestureSet.length; i++) {
    const {
      deviceName, sampleName, subjectID, attemptNb, gestSample
    } = DrawGestureSet[i];

    const padSubjectID = subjectID.toString().padStart(2, '0');
    const padAttemptNb = attemptNb.toString().padStart(2, '0');

    const filename = `${deviceName}/${padSubjectID}/${sampleName}/${sampleName}-${padAttemptNb}.json`;

    zip.file(filename, JSON.stringify(gestSample, null, 2));

  }

}

// export default Homepage;
export default {
  routeProps: {
    path: '/',
    exact: true,
    component: Homepage,
  },
  name: 'Homepage',
};