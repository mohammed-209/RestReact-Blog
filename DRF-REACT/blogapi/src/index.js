import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route,  BrowserRouter as Router, Routes} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/auth/register';
import Login from "./components/auth/login"
import Logout from "./components/auth/logout"
import Single from './components/posts/single';
import Search from './components/posts/search';
import Admin from './Admin';
import Create from './components/admin/create';
import Edit from './components/admin/edit';
import Delete from './components/admin/delete';

const routing = (
  <Router>
    <React.StrictMode>
      <Header/>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route exact path="/admin" Component={Admin} />
        <Route exact path="/admin/create" Component={Create} />
        <Route exact path="/admin/edit/:id" Component={Edit} />
        <Route exact path="/admin/delete/:id" Component={Delete} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/post/:slug" Component={Single} />
        <Route path="/search" Component={Search} />
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
