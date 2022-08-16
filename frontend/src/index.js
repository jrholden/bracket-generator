import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, Link, BrowserRouter as Router} from 'react-router-dom';

import './index.css';
import App from './App';
import Profile from "./components/Profile";
import Tourney from "./components/Tourney";

const routes = (
    <React.StrictMode>
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Tournament Generator</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tourney">Tournament</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route exact path="/" element={<App/>}/>
                    <Route path="/tourney" element={<Tourney/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </div>
        </Router>
    </React.StrictMode>
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(routes);
