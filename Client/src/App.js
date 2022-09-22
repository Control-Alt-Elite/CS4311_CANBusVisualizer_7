import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectConfigurationHolder from './project-config/ProjectConfigurationHolder';
import CanBusConfigurationHolder from './can-bus-config/CanBusConfigurationHolder';
import SessionConfigurationHolder from './session-config/SessionConfigurationHolder';
import SplitView from './split-view/SplitView';


function App(){
   return(
<Router>
    <Routes>
        <Route exact path="/" element={<ProjectConfigurationHolder />}></Route>
        <Route exact path="/main" element={< SplitView/>}></Route>
        <Route exact path="/canbus" element={<CanBusConfigurationHolder />}></Route>
        <Route exact path="/session" element={<SessionConfigurationHolder />}></Route>
    </Routes>
</Router>
   );
}

export default App;