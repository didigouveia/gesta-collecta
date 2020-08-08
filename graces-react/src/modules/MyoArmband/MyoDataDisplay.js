import React, { useContext, useState, useEffect } from 'react';
import { MyoContext } from './MyoContext';
import Myo from 'myo'


const MyoDataDisplay = (props) => {
  // const [connectionStatus, setConStatus] = useState("Myo Armband disconnected...")
  const [myoLog, setMyoLog] = useState("Myo Armband disconnected...");
  const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0, w: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });

  const { pushToCurrStrokes, pushToStrokes } = useContext(MyoContext);
  // https://www.pluralsight.com/guides/event-listeners-in-react-components
  useEffect(() => {
    Myo.connect("com.uclouvain.graces");
    Myo.on("connected", function (data, timestamp) {
      setMyoLog("Myo successfully connected! \nData: " + JSON.stringify(data));
    });

    Myo.on('imu', function (data) {
      setOrientation(data.orientation);
      setGyroscope(data.gyroscope);
      setAccelerometer(data.accelerometer);
    })

    Myo.on('fist', function () {
      this.on('imu', (data) => {
        const timestamp = Date.now();
        pushToCurrStrokes(data, timestamp);
        // console.log(data.orientation + ' ' + Date.now());
      })
      this.vibrate('short');
      setMyoLog("Myo fist detected!");
    });

    Myo.on('fist_off', function () {
      this.off('imu');
      pushToStrokes();
      this.vibrate('short');
      setMyoLog("Myo fist unclenched!");
    })

    Myo.on('fingers_spread', function () {
      this.zeroOrientation();
      this.vibrate('short');
      setMyoLog("Myo orientation origin set!");
      // console.log(orientation, gyroscope, accelerometer);
    });

    return () => {
      Myo.off('connected');
      Myo.off('imu');
      Myo.off('fist');
      Myo.off('fingers_spread');
      Myo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { orientStrokes } = useContext(MyoContext);
  return (
    <div id='MyoDataDisplay' className='blue accent-1'>
      <div className="container">
        <h4 className="white-text">Myo IMU data</h4>
        <table className="white striped">
          <thead>
            <tr>
              <th>IMU data</th>
              <td>x</td>
              <td>y</td>
              <td>z</td>
              <td>w</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Orientation</td>
              <td>{orientation.x.toFixed(5)}</td>
              <td>{orientation.y.toFixed(5)}</td>
              <td>{orientation.z.toFixed(5)}</td>
              <td>{orientation.w.toFixed(5)}</td>
            </tr>
            <tr>
              <td>Gyroscope</td>
              <td>{gyroscope.x.toFixed(3)}</td>
              <td>{gyroscope.x.toFixed(3)}</td>
              <td>{gyroscope.x.toFixed(3)}</td>
              <td></td>
            </tr>
            <tr>
              <td>Accelerometer</td>
              <td>{accelerometer.x.toFixed(3)}</td>
              <td>{accelerometer.x.toFixed(3)}</td>
              <td>{accelerometer.x.toFixed(3)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container">
        <h6>
          Double-tap your index and thumb fingers to unlock your Myo Armband. <br />
          Spread your fingers to reset orientation origin. <br />
          Keep fist clenched to record a stroke.
        </h6>

        <h6>
          {myoLog}
        </h6>
        <br />
        <h5>
          {"Strokes recorded: " + orientStrokes.length}
        </h5>

      </div>

    </div>

  );
}

export default MyoDataDisplay;