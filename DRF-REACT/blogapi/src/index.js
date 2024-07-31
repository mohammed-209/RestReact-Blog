import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route,  BrowserRouter as Router, Routes} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/register';
import Login from "./components/login"
import Logout from "./components/logout"
import Single from './components/single';

const routing = (
  <Router>
    <React.StrictMode>
      <Header/>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/post/:slug" Component={Single} />
      </Routes>
      <Footer/>
    </React.StrictMode>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(routing)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
