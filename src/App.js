import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);


// Pages
const Login = React.lazy(() => import("./components/login"));
const Home = React.lazy(() => import("./components/TeamForm"));
const AdminPage = React.lazy(() => import("./components/AdminPage"));

function App() {
  return (
        <React.Suspense fallback={loading}>
          <Router>
            <Routes>
              <Route
                exact
                path="/login"
                name="Login Page"
                element={<Login />}
              />
              <Route
                exact
                path="/adminPage"
                name="Admin Page"
                element={<AdminPage/>}
              />
              <Route
                path="/"
                name="Home"
                element={ <Home/>}
              />
            </Routes>
          </Router>
        </React.Suspense>
  );
}

export default App;
