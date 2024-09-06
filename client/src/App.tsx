import React from "react";
import LoginForm from "./components/LoginForm";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileComponent from "./components/ProfileComponent";
import About from "./components/About";

const App: React.FC = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='/login' element={<LoginForm />} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/profile' element={<ProfileComponent />} />
                </Route>
            </Routes>
        </MainLayout>
    );
};

export default App;
