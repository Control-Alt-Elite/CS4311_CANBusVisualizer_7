import { AnimatePresence } from "framer-motion";
import React from "react";
import {
    BrowserRouter as Router,
    Route, Routes, useLocation
} from "react-router-dom";
import Home from "../components/home-screen/Home";
import Navbar from "../components/nav-bar/Navbar";
import ArchiveProject from "../components/project-handlers/archive/ArchiveProject";
import CANBusManager from "../components/project-handlers/bus-manager/CANBusManager";
import OpenProject from "../components/project-handlers/open/OpenProject";
import { default as ProjectConfigurationHolder, default as ProjectInfoHolder } from "../components/project-handlers/project-config/ProjectInfoHolder";
import SplitView from "../components/split-view/SplitView";
import Sync from "../components/sync/Sync";
import AboutUs from "../components/to-be-deleted/about-us/AboutUs";
import TrafficDisplayer from "../components/traffic-displayer/TrafficDisplayer";
 
function Animated() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location}
                key={location.pathname}>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/ProjectConfigurationHolder"
                    element={<ProjectConfigurationHolder />}></Route>
                <Route exact path="/CreateProject"
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
                <Route exact path="/CANBusManager"
                    element={<CANBusManager />}></Route>
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
