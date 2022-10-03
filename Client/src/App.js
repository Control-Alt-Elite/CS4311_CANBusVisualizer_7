import React from "react"
import { BrowserRouter as Router, 
    Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SessionConfigurationHolder from "./components/SessionConfigurationHolder";
import SplitView from "./components/SplitView";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Sync from './components/Sync';
import { AnimatePresence } from 'framer-motion';
import ProjectConfigurationHolder from "./components/ProjectConfigurationHolder";
  
const Animated = () => {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter >
            <Routes location={location} 
                key={location.pathname}>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/ProjectConfigurationHolder" 
                    element={<ProjectConfigurationHolder/>}></Route>
                <Route exact path="/SessionConfigurationHolder" 
                    element={<SessionConfigurationHolder/>}></Route>
				<Route exact path="/Sync" 
                    element={<Sync/>}></Route>
            </Routes>
        </AnimatePresence>
    )
}
  
function App() {
    return (
        <div className="App">
            <>
                <Router>
                    <Navbar />
                    <Animated />
                </Router>
            </>
        </div>
    );
}
  
export default App;