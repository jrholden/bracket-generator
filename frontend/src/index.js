import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, Link, BrowserRouter as Router} from 'react-router-dom';

import './index.css';
import App from './App';
import Profile from "./components/Profile";
import Tourney from "./components/Tourney";
import Tournament from "./components/Tournament";
import SocketService from "./services/SocketService";
import Admin from "./components/Admin";
import Brackets from "./components/Brackets";

let socket = new SocketService();
socket.connect();
socket.listen();

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
                                    <Link className="nav-link" to="/tourney">Tournaments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/brackets">Brackets</Link>
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
                    <Route exact path="/" element={<App socket={socket}/>}/>
                    <Route path="/tourney" element={<Tourney socket={socket}/>}/>
                    <Route path="/profile" element={<Profile socket={socket}/>}/>
                    <Route exact path="/tourney/:id" element={<Tournament socket={socket}/>}/>
                    <Route exact path="/brackets/" element={<Brackets socket={socket}/>}/>
                    <Route exact path="/admin/" element={<Admin socket={socket}/>}/>
                </Routes>
            </div>
        </Router>
    </React.StrictMode>
);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(routes);
