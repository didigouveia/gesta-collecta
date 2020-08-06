import React, { Component, createContext } from 'react'
import Point from '../../utils/gestureFormat_v1/Point';

export const MyoContext = createContext();

class MyoContextProvider extends Component {
  state = {
    currOrientStroke: [],
    currGyrosStroke: [],
    currAccelStroke: [],
    orientStrokes: [],
    gyrosStrokes: [],
    accelStrokes: []
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
    // console.log(this.state.orientStrokes);
  }

  render() {
    return (
      <MyoContext.Provider
        value={{
          ...this.state,
          pushToCurrStrokes: this.pushToCurrStrokes,
          pushToStrokes: this.pushToStrokes
        }}>
        {this.props.children}
      </MyoContext.Provider>
    );
  }
}

export default MyoContextProvider;