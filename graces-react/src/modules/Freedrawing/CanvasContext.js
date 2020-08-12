import React, { Component, createContext } from 'react'
import Point from '../../utils/gestureFormat_v1/Point'
import Device from '../../utils/gestureFormat_v1/Device'
import GestureSample from '../../utils/gestureFormat_v1/GestureSample'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const CanvasContext = createContext()

class CanvasContextProvider extends Component {
  state = {
    loadTimeOffset: 5,
    backgroundColor: 'white', // #FFF
    lazyRadius: 1,
    brushRadius: 5,
    brushColor: "black", // #444
    catenaryColor: "#0a0302", // #0a0302
    // gridColor: "red", // rgba(150,150,150,0.17)
    // hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false,
    canvas: null,
    loadButtonAvail: "disabled",
    undoButtonAvail: "disabled",
    strokes: [],
    savedStrokes: null,
    currStroke: [],
    stroke_id: 0,
    pointerDown: false,
    sampleName: "",
    subjectID: "",
    prevSampleName: "",
    attemptNb: 0,
    deviceName: ""
  }

  getRef = (canvasDraw) => {
    if (canvasDraw) {
      this.setState({
        canvas: canvasDraw,
        saveData: canvasDraw.getSaveData()
      })
    }
  }
  handleCanvasWidth = (width) => {
    this.setState({ canvasWidth: width })
  }
  handleCanvasHeight = (height) => {
    this.setState({ canvasHeight: height })
  }
  handleBrushColor = (color) => {
    this.setState({ brushColor: color.hex })
  }
  handleBackgroundColor = (color) => {
    this.setState({ backgroundColor: color.hex })
  }
  handleCatenaryColor = (color) => {
    this.setState({ catenaryColor: color.hex })
  }
  handleBrushRadius = (e) => {
    const radius = parseInt(e.target.value)
    this.setState({ brushRadius: radius })
  }
  handleLazyRadius = (e) => {
    const radius = parseInt(e.target.value)
    this.setState({ lazyRadius: radius })
  }
  handleInterface = () => {
    this.setState({ hideInterface: !this.state.hideInterface })
  }
  handleLoadTimeOffset = (e) => {
    const offset = parseInt(e.target.value)
    if (offset === 0) {
      this.setState({ immediateLoading: true })
    }
    else {
      this.setState({ immediateLoading: false })
    }
    this.setState({ loadTimeOffset: offset })
  }
  clearCanvas = () => {
    this.state.canvas.clear()
    this.setState({
      strokes: [],
      stroke_id: 0,
      undoButtonAvail: "disabled"
    })
  }
  clearGesture = () => {
    this.state.canvas.clear()
    this.setState({
      saveData: this.state.canvas.getSaveData(),
      loadButtonAvail: "disabled",
      undoButtonAvail: "disabled",
      strokes: [],
      stroke_id: 0
    })
  }
  undoCanvas = () => {
    this.state.canvas.undo()
    this.state.strokes.pop()
    this.setState({ stroke_id: this.state.stroke_id - 1 })
    if (this.state.strokes.length === 0)
      this.setState({ undoButtonAvail: "disabled" })
  }
  saveCanvas = () => {
    if (this.state.strokes.length) {
      this.setState({
        saveData: this.state.canvas.getSaveData(),
        loadButtonAvail: "",
        savedStrokes: [...this.state.strokes]
      })
    }
  }
  loadCanvas = () => {
    this.state.canvas.loadSaveData(this.state.saveData)
    this.setState({
      strokes: [...this.state.savedStrokes],
      stroke_id: this.state.savedStrokes.length,
      undoButtonAvail: ""
    })
  }
  // finishedLoading = (saveDataJSON) => {
  //   const linesTotal = saveDataJSON.lines.length
  //   return (this.state.canvas.lines.length >= linesTotal)
  // }
  onChange = () => {
    // empty
  }
  handleCanvasAvail = () => {
    this.setState({ disabled: !this.state.disabled })
  }
  onPointerMove = (e) => {
    if (this.state.canvas.isPressing) {
      const { stroke_id } = this.state
      const point = new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY, Date.now(), stroke_id)
      // console.log(point)
      this.state.currStroke.push(point)
    }
  }
  onPointerDown = (e) => {
    // console.log('pointer down')
    this.setState({
      pointerDown: true,
      undoButtonAvail: ""
    })
    const { stroke_id } = this.state
    const point = new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY, Date.now(), stroke_id)
    // console.log(point)
    this.state.currStroke.push(point)
  }
  onPointerUp = () => {
    // console.log('pointer up')
    // console.log(this.state.currStroke.length)
    if (this.state.currStroke.length) {
      this.state.strokes.push(this.state.currStroke)
      this.setState({
        stroke_id: this.state.stroke_id + 1,
        currStroke: []
      })
    }
  }
  onPointerLeave = () => {
    if (this.state.pointerDown && this.state.currStroke.length) {
      this.state.strokes.push(this.state.currStroke)
      this.setState({
        stroke_id: this.state.stroke_id + 1,
        currStroke: []
      })
    }
    this.setState({ pointerDown: false })
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

  setDeviceName = (deviceName) => {
    this.setState({ deviceName: deviceName });
    this.setState({ attemptNb: 0 });
  }

  handleForm = (e) => {
    e.preventDefault();
    const {
      sampleName, subjectID, attemptNb,
      savedStrokes, deviceName, canvasWidth,
      canvasHeight
    } = { ...this.state };

    const gestSample = createGestSample(sampleName, parseInt(subjectID), savedStrokes,
      canvasWidth, canvasHeight);

    const action = document.activeElement.name;
    if (action === "submit") {
      submitGestSample(gestSample, sampleName, parseInt(subjectID), attemptNb, deviceName);
    } else if (action === "download") {
      downloadGestSample(gestSample, sampleName, parseInt(subjectID), attemptNb, deviceName);
    }

    this.setState({
      attemptNb: this.state.attemptNb + 1
    })
  }

  render() {
    return (
      <CanvasContext.Provider
        value={{
          ...this.state,
          handleCanvasWidth: this.handleCanvasWidth,
          handleCanvasHeight: this.handleCanvasHeight,
          handleBrushColor: this.handleBrushColor,
          handleBackgroundColor: this.handleBackgroundColor,
          handleCatenaryColor: this.handleCatenaryColor,
          handleBrushRadius: this.handleBrushRadius,
          handleLazyRadius: this.handleLazyRadius,
          handleInterface: this.handleInterface,
          getRef: this.getRef,
          handleLoadTimeOffset: this.handleLoadTimeOffset,
          clearCanvas: this.clearCanvas,
          undoCanvas: this.undoCanvas,
          saveCanvas: this.saveCanvas,
          loadCanvas: this.loadCanvas,
          onChange: this.onChange,
          handleCanvasAvail: this.handleCanvasAvail,
          onPointerMove: this.onPointerMove,
          onPointerDown: this.onPointerDown,
          onPointerUp: this.onPointerUp,
          onPointerLeave: this.onPointerLeave,
          clearGesture: this.clearGesture,
          handleForm: this.handleForm,
          setSampleName: this.setSampleName,
          setSubjectID: this.setSubjectID,
          setAttemptNb: this.setAttemptNb,
          setDeviceName: this.setDeviceName
        }}
      >
        {this.props.children}
      </CanvasContext.Provider>
    )
  }
}


function createGestSample(sampleName, subjectID, strokes, canvasWidth, canvasHeight) {
  const dateNow = (new Date()).toLocaleString('en-GB');
  const mode = document.getElementById("mode").value;
  const device = createDevice(mode, canvasWidth, canvasHeight);

  const gestSample = new GestureSample(
    sampleName, subjectID, dateNow, strokes, device
  );

  return gestSample;
}

function createDevice(mode, canvasWidth, canvasHeight) {
  const resolutionHeight = window.screen.height;
  const resolutionWidth = window.screen.width;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const pixelRatio = window.devicePixelRatio;

  const device = new Device(navigator.appVersion);
  device[mode] = true;
  device.resolutionHeight = resolutionHeight;
  device.resolutionWidth = resolutionWidth;
  device.windowHeight = canvasHeight;
  device.windowWidth = canvasWidth;
  device.pixelRatio = pixelRatio;

  return device;
}

function downloadGestSample(gestSample, sampleName, subjectID, attemptNb, deviceName) {
  const zip = new JSZip();
  const attNbString = attemptNb.toString().padStart(2, '0');
  const subjIDString = subjectID.toString().padStart(2, '0');
  zip.file(`${sampleName}-${attNbString}.json`, JSON.stringify(gestSample, null, 2));

  zip.generateAsync({ type: "blob" })
    .then(function (blob) {
      saveAs(blob, `${deviceName}-${subjIDString}-${sampleName}-${attNbString}`);
    });
}

function submitGestSample(gestSample, sampleName, subjectID, attemptNb, deviceName) {
  let drawGestureSet = sessionStorage.getItem('DrawGestureSet');
  if (drawGestureSet === null) {
    drawGestureSet = [];
  } else {
    drawGestureSet = JSON.parse(drawGestureSet);
  }

  const gestureSample = {
    "deviceName": deviceName,
    "sampleName": sampleName,
    "subjectID": subjectID,
    "attemptNb": attemptNb,
    "gestSample": gestSample
  }
  drawGestureSet.push(gestureSample);

  sessionStorage.setItem('DrawGestureSet', JSON.stringify(drawGestureSet));
}

export default CanvasContextProvider