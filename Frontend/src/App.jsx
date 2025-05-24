import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Menu from './components/Menu';
import Home from './components/Home';
import Revenue from './components/Revenue';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/doanhthu" element={<Revenue />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
