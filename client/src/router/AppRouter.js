import { AnimatePresence } from 'framer-motion';
import React from "react";
import {
    BrowserRouter as Router,
    Route, Routes, useLocation
} from "react-router-dom";
import AboutUs from "../components/AboutUs";
import ArchiveProject from "../components/ArchiveProject";
import CANBusManager from "../components/CANBusManager";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import OpenProject from "../components/OpenProject";
import ProjectConfigurationHolder from "../components/ProjectConfigurationHolder";
import ProjectInfoHolder from "../components/ProjectInfoHolder";
import SplitView from "../components/SplitView";
import Sync from "../components/Sync";

function Animated() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location}
                key={location.pathname}>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/ProjectConfigurationHolder"
                    element={<ProjectConfigurationHolder />}></Route>
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


  