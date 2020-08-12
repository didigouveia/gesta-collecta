import React, { Component, createContext } from 'react'
import Point from '../../utils/gestureFormat_v1/Point';
import Device from '../../utils/gestureFormat_v1/Device';
import GestureSample from '../../utils/gestureFormat_v1/GestureSample';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const MyoContext = createContext();

class MyoContextProvider extends Component {
  state = {
    currOrientStroke: [],
    currGyrosStroke: [],
    currAccelStroke: [],
    orientStrokes: [],
    gyrosStrokes: [],
    accelStrokes: [],
    sampleName: "",
    subjectID: "",
    prevSampleName: "",
    attemptNb: 0
  }

  pushToCurrStrokes = (data, timestamp) => {
    // console.log(data);
    let { w, x, y, z } = data.orientation;
    const orientPoint = new Point(x, y, timestamp, this.state.orientStrokes.length);
    orientPoint.z = z;
    orientPoint.w = w;

    ({ x, y, z } = data.gyroscope);
    const gyrosPoint = new Point(x, y, timestamp, this.state.gyrosStrokes.length);
    gyrosPoint.z = z;

    ({ x, y, z } = data.accelerometer);
    const accelPoint = new Point(x, y, timestamp, this.state.accelStrokes.length);
    accelPoint.z = z;

    this.state.currOrientStroke.push(orientPoint);
    this.state.currGyrosStroke.push(gyrosPoint);
    this.state.currAccelStroke.push(accelPoint);
  }

  pushToStrokes = () => {
    this.state.orientStrokes.push(this.state.currOrientStroke);
    this.state.gyrosStrokes.push(this.state.currGyrosStroke);
    this.state.accelStrokes.push(this.state.currAccelStroke);

    this.setState({
      currOrientStroke: [],
      currGyrosStroke: [],
      currAccelStroke: []
    })

    if (this.state.orientStrokes.length > 0) {
      const downloadButtons = document.getElementsByClassName("MyoDownloadButton");
      for (let i = 0; i < downloadButtons.length; i++) {
        downloadButtons[i].classList.remove("disabled");
      }
    }
    // console.log(this.state.orientStrokes);
  }

  setSampleName = (sampleName) => {
    this.setState({ sampleName: sampleName });
    this.setState({ attemptNb: 0 });
  }

  setSubjectID = (subjectID) => {
    this.setState({ subjectID: parseInt(subjectID) });
    this.setState({ attemptNb: 0 });
  }

  setAttemptNb = (attemptNb) => {
    this.setState({ attemptNb: parseInt(attemptNb) });
  }

  undoStroke = () => {
    this.state.orientStrokes.pop();
    this.state.gyrosStrokes.pop();
    this.state.accelStrokes.pop();

    if (this.state.orientStrokes.length === 0) {
      const downloadButtons = document.getElementsByClassName("MyoDownloadButton");
      for (let i = 0; i < downloadButtons.length; i++) {
        downloadButtons[i].classList.add("disabled");
      }
    }
  }

  clearGesture = () => {
    this.setState({
      currOrientStroke: [],
      currGyrosStroke: [],
      currAccelStroke: [],
      orientStrokes: [],
      gyrosStrokes: [],
      accelStrokes: []
    })
    const downloadButtons = document.getElementsByClassName("MyoDownloadButton");
    for (let i = 0; i < downloadButtons.length; i++) {
      downloadButtons[i].classList.add("disabled");
    }
  }

  handleDownload = () => {
    const {
      sampleName, subjectID, attemptNb,
      orientStrokes, gyrosStrokes, accelStrokes
    } = { ...this.state };

    const [orientGestSample, gyrosGestSample, accelGestSample] =
      createGestSamples(sampleName, parseInt(subjectID),
        orientStrokes, gyrosStrokes, accelStrokes);

    downloadGestSamples(orientGestSample, gyrosGestSample, accelGestSample,
      sampleName, parseInt(subjectID), attemptNb);

    this.setState({
      attemptNb: this.state.attemptNb + 1
    })
  }

  handleSubmit = () => {
    const {
      sampleName, subjectID, attemptNb,
      orientStrokes, gyrosStrokes, accelStrokes
    } = { ...this.state };

    const [orientGestSample, gyrosGestSample, accelGestSample] =
      createGestSamples(sampleName, parseInt(subjectID),
        orientStrokes, gyrosStrokes, accelStrokes);

    submitGestSamples(orientGestSample, gyrosGestSample, accelGestSample,
      sampleName, parseInt(subjectID), attemptNb);

    this.setState({
      attemptNb: this.state.attemptNb + 1
    })
  }

  handleForm = (e) => {
    e.preventDefault();
    const action = document.activeElement.name;
    if (action === "submit") {
      this.handleSubmit();
    } else if (action === "download") {
      this.handleDownload();
    }
  }

  render() {
    return (
      <MyoContext.Provider
        value={{
          ...this.state,
          pushToCurrStrokes: this.pushToCurrStrokes,
          pushToStrokes: this.pushToStrokes,
          setSetName: this.setSetName,
          setSampleName: this.setSampleName,
          setSubjectID: this.setSubjectID,
          undoStroke: this.undoStroke,
          clearGesture: this.clearGesture,
          setAttemptNb: this.setAttemptNb,
          handleForm: this.handleForm
        }}>
        {this.props.children}
      </MyoContext.Provider>
    );
  }
}

function createGestSamples(sampleName, subjectID,
  orientStrokes, gyrosStrokes, accelStrokes) {

  const dateNow = (new Date()).toLocaleString('en-GB');
  const [orientDevice, gyrosDevice, accelDevice] = createDevices();

  const orientGestSample = new GestureSample(
    sampleName, subjectID, dateNow, orientStrokes, orientDevice
  );
  const gyrosGestSample = new GestureSample(
    sampleName, subjectID, dateNow, gyrosStrokes, gyrosDevice
  );
  const accelGestSample = new GestureSample(
    sampleName, subjectID, dateNow, accelStrokes, accelDevice
  );

  return [orientGestSample, gyrosGestSample, accelGestSample];
}

function createDevices() {
  const resolutionHeight = window.screen.height;
  const resolutionWidth = window.screen.width;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const pixelRatio = window.devicePixelRatio;

  const orientDevice = new Device(navigator.appVersion);
  orientDevice.orientation = true;
  orientDevice.resolutionHeight = resolutionHeight;
  orientDevice.resolutionWidth = resolutionWidth;
  orientDevice.windowHeight = windowHeight;
  orientDevice.windowWidth = windowWidth;
  orientDevice.pixelRatio = pixelRatio;

  const gyrosDevice = new Device(navigator.appVersion);
  gyrosDevice.gyroscope = true;
  gyrosDevice.resolutionHeight = resolutionHeight;
  gyrosDevice.resolutionWidth = resolutionWidth;
  gyrosDevice.windowHeight = windowHeight;
  gyrosDevice.windowWidth = windowWidth;
  gyrosDevice.pixelRatio = pixelRatio;

  const accelDevice = new Device(navigator.appVersion);
  accelDevice.acceleration = true;
  accelDevice.resolutionHeight = resolutionHeight;
  accelDevice.resolutionWidth = resolutionWidth;
  accelDevice.windowHeight = windowHeight;
  accelDevice.windowWidth = windowWidth;
  accelDevice.pixelRatio = pixelRatio;
  return [orientDevice, gyrosDevice, accelDevice];
}

function downloadGestSamples(orientGestSample, gyrosGestSample, accelGestSample, sampleName, subjectID, attemptNb) {
  const zip = new JSZip();
  const attNbString = attemptNb.toString().padStart(2, '0');
  const subjIDString = subjectID.toString().padStart(2, '0');
  const sampleFolderZip = zip.folder(`${sampleName}-${attNbString}`);
  sampleFolderZip.file(`${sampleName}-orientation-${attNbString}.json`, JSON.stringify(orientGestSample, null, 2));
  sampleFolderZip.file(`${sampleName}-gyroscope-${attNbString}.json`, JSON.stringify(gyrosGestSample, null, 2));
  sampleFolderZip.file(`${sampleName}-acceleration-${attNbString}.json`, JSON.stringify(accelGestSample, null, 2));

  zip.generateAsync({ type: "blob" })
    .then(function (blob) {
      saveAs(blob, `MyoArmband-${subjIDString}-${sampleName}-${attNbString}`);
    });
}

function submitGestSamples(orientGestSample, gyrosGestSample, accelGestSample, sampleName, subjectID, attemptNb) {
  // localStorage.removeItem('MyoGestureSet');
  let myoGestureSet = sessionStorage.getItem('MyoGestureSet');
  if (myoGestureSet === null) {
    myoGestureSet = [];
  } else {
    myoGestureSet = JSON.parse(myoGestureSet);
  }

  const gestureSample = {
    "sampleName": sampleName,
    "subjectID": subjectID,
    "attemptNb": attemptNb,
    "orientGestSample": orientGestSample,
    "gyrosGestSample": gyrosGestSample,
    "accelGestSample": accelGestSample
  }
  myoGestureSet.push(gestureSample);

  sessionStorage.setItem('MyoGestureSet', JSON.stringify(myoGestureSet));
}

export default MyoContextProvider;