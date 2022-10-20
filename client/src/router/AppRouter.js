import React from "react"
import { BrowserRouter as Router, 
    Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Home from "../components/home-screen/Home";
import Navbar from "../components/nav-bar/Navbar";
// import ProjectConfigurationHolder from "../components/project-config/ProjectConfigurationHolder";
import ProjectInfoHolder from "../components/project-config/ProjectInfoHolder";
import OpenProject from "../components/OpenProject"
import SplitView from "../components/split-view/SplitView"
import Sync from "../components/Sync";
import ArchiveProject from "../components/ArchiveProject";
import AboutUs from "../components/AboutUs";
import TrafficDisplayer from "../components//TrafficDisplayer";
import { AnimatePresence } from 'framer-motion';


function Animated() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location}
                key={location.pathname}>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/Home"
                    element={<Home />}></Route>
                <Route exact path="/ProjectInfoHolder"
                    element={<ProjectInfoHolder />}></Route>
                <Route exact path="/OpenProject"
                    element={<OpenProject />}></Route>
                <Route exact path="/Sync"
                    element={<Sync />}></Route>
                <Route exact path="/ArchiveProject"
                    element={<ArchiveProject />}></Route>
                <Route exact path="/SplitView"
                    element={<SplitView />}></Route>
                <Route exact path="/AboutUs"
                    element={<AboutUs />}></Route>
                <Route exact path="/TrafficDisplayer"
                    element={<TrafficDisplayer />}></Route>
            </Routes>
        </AnimatePresence>
    );
}

export default function AppRouter() {
    return (
        <div className="AppRouter">
            <>
                <Router>
                    <Navbar />
                    <Animated />
                </Router>
            </>
        </div>
    );
}


  