import React, { Component, createContext } from 'react'
import Point from '../utils/gestureFormat_v1/Point'
// import Device from '../utils/gestureFormat_v1/Device'
// import GestureSample from '../utils/gestureFormat_v1/GestureSample'

export const CanvasContext = createContext()

class CanvasContextProvider extends Component {
  state = {
    loadTimeOffset: 3,
    backgroundColor: 'white', // #FFF
    lazyRadius: 1,
    brushRadius: 5,
    brushColor: "green", // #444
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
    pointerDown: false
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
  downloadGesture = () => {
    console.log(this.state.savedStrokes)
    //TODO

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
          downloadGesture: this.downloadGesture,
        }}
      >
        {this.props.children}
      </CanvasContext.Provider>
    )
  }
}

export default CanvasContextProvider