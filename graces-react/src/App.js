import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BASENAME } from './utils/GlobalConstants'
import modules from './modules';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={BASENAME} >
        <Switch>
          {modules.map(module => (
            <Route {...module.routeProps} key={module.name} />
          ))}
          {/* <Route exact path={'/'} component={Dashboard} />
          <Route exact path={'/freedrawing'} component={Freedrawing} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
