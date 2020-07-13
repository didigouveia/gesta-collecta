import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className='container blue accent-1 valign-wrapper' id='dashboard'>
        <div id='dashcard' className="row" >
          <div className="col s12 m12">
            <div className="card-panel z-depth-5 center-align ">
              <Link to={'/freedrawing'} className="waves-effect waves-light btn-large blue darken-2"
                style={{ marginBottom: 1 + 'em', width: 200 + 'px' }}
              >Free drawing</Link>
              <div>
                <Link to={'/'} className="waves-effect waves-light btn-large blue darken-2"
                  style={{ /*marginBottom: 1 + 'em',*/ width: 200 + 'px' }}
                >Placeholder</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;