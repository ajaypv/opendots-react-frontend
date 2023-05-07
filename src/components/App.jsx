import { useState,useRef } from 'react'
import '../styles/App.css';
import SignUp  from "./SignUp";
import PrivateRoute from './PrivateRoute';
import Dashboard from "./Dashboard";
import Splash from "./Splash";
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  
  return (
    <Router>
    <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/dashbord" component={Dashboard} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Splash} />
      </Switch>
    </AuthProvider>
  </Router>
      
    
  )
}

export default App
