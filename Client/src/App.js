import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SessionConfigurationHolder from './session-config/SessionConfigurationHolder';
import SplitView from './split-view/SplitView';


function App(){
   return(
<Router>
    <Routes>
        <Route exact path="/" element={<SessionConfigurationHolder/>}></Route>
        <Route exact path="/main" element={< SplitView/>}></Route>
    </Routes>
</Router>
   );
}

export default App;