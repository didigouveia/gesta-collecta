import React from 'react';
// import CanvasDrawComponent from './components/CanvasDrawComponent'
// import CanvasContextProvider from './contexts/CanvasContext';
// import CanvasControlPanel from './components/CanvasControlPanel';
// import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard';
import Freedrawing from './components/Freedrawing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BASENAME } from './utils/GlobalConstants'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={BASENAME} >
        <Switch>
          <Route exact path={'/'} component={Dashboard} />
          <Route exact path={'/freedrawing'} component={Freedrawing} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
