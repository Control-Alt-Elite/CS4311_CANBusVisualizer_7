import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SessionConfigurationHolder from '../components/SessionConfigurationHolder';
import ProjectConfigurationHolder from '../components/ProjectConfigurationHolder';

const AppRouter = () => (
  <Router>
    <div className="container">
      <ProjectConfigurationHolder />
      <Routes>
        <Route exact path= "/" element= {SessionConfigurationHolder} />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;