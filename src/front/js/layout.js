import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import Characters from "./pages/External-API/Characters";
import CharDetails from "./pages/External-API/CharDetails";
import Planets from "./pages/External-API/Planets";
import PlanetsDetails from "./pages/External-API/PlanetsDetails";
import Vehicles from "./pages/External-API/Vehicles";
import VehiclesDetails from "./pages/External-API/VehiclesDetails";

import SignUp from "./pages/LoginPages/Signup";
import Login from "./pages/LoginPages/Login";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />             
                       
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<CharDetails />} path="/characters/:id" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetsDetails />} path="/planets/:id" />
                        <Route element={<Vehicles />} path="/vehicles" />
                        <Route element={<VehiclesDetails />} path="/vehicles/:id" />
                        
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />

                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
