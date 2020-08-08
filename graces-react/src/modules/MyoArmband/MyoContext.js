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
    setName: "",
    sampleName: "",
    subjectID: "",
    prevSampleName: "",
    tryNb: 0
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
    if (this.state.orientStrokes.length > 0) {
      const downloadButton = document.getElementById("MyoDownloadButton");
      downloadButton.classList.remove("disabled");
    }
    // console.log(this.state.orientStrokes);
  }

  setSetName = (setName) => {
    this.setState({ setName: setName });
  }

  setSampleName = (sampleName) => {
    this.setState({ sampleName: sampleName });
  }

  setSubjectID = (subjectID) => {
    this.setState({ subjectID: subjectID });
  }

  handleDownload = (e) => {
    e.preventDefault();
    const {
      setName, sampleName, subjectID,
      orientStrokes, gyrosStrokes, accelStrokes
    } = this.state;
    const dateNow = (new Date()).toLocaleString('en-GB');
    const [orientDevice, gyrosDevice, accelDevice] = createDevices();

    const orientGestSample = new GestureSample(
      sampleName, parseInt(subjectID), dateNow, orientStrokes, orientDevice
    );
    const gyrosGestSample = new GestureSample(
      sampleName, parseInt(subjectID), dateNow, gyrosStrokes, gyrosDevice
    );
    const accelGestSample = new GestureSample(
      sampleName, parseInt(subjectID), dateNow, accelStrokes, accelDevice
    );

    console.log(orientGestSample);

    downloadGestSamples(orientGestSample, gyrosGestSample, accelGestSample, sampleName);

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
          handleDownload: this.handleDownload
        }}>
        {this.props.children}
      </MyoContext.Provider>
    );
  }
}

function createDevices() {
  const orientDevice = new Device(navigator.appVersion);
  orientDevice.orientation = true;
  const gyrosDevice = new Device(navigator.appVersion);
  gyrosDevice.gyroscope = true;
  const accelDevice = new Device(navigator.appVersion);
  accelDevice.acceleration = true;
  return [orientDevice, gyrosDevice, accelDevice];
}

function downloadGestSamples(orientGestSample, gyrosGestSample, accelGestSample, sampleName) {
  const zip = new JSZip();

  const sampleFolderZip = zip.folder(`${sampleName}_0`);
  sampleFolderZip.file(`${sampleName}-orientation-0.json`, JSON.stringify(orientGestSample, null, 2));
  sampleFolderZip.file(`${sampleName}-gyroscope-0.json`, JSON.stringify(gyrosGestSample, null, 2));
  sampleFolderZip.file(`${sampleName}-acceleration-0.json`, JSON.stringify(accelGestSample, null, 2));

  zip.generateAsync({ type: "blob" })
    .then(function (blob) {
      saveAs(blob, `${sampleName}_0`);
    });
}

export default MyoContextProvider;