import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Nav from "./Nav"
import Header from "./Header";
import Dots from "./DotConnect"
import OpenStage from "./Stage";
import "../styles/Dashboard.css";
import LearningLanguageCheckbox from "./LearningLanguageCheckbox"
import HobbiesCheckbox from "./HobbiesCheckbox";
import MultiStepForm from "./MultiStepForm";
import { auth, firestore, database} from "../firebase";
import { getDatabase, ref, set ,update } from "firebase/database";
import ResultComponent from "./ResultComponent";

export default function Dashboard() {
  const [currentComponent, setCurrentComponent] = useState('ComponentA');
  console.log("compomnrt", currentComponent)

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory()

  const handleComponentChange = (componentName) => {
    setCurrentComponent(componentName);
    console.log("called")
    
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/signup")
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
     <Nav onComponentChange={handleComponentChange} />
     {currentComponent === 'ComponentB' && <Dots/>}
      {currentComponent === 'ComponentA' && <MultiStepForm />}
      {currentComponent === 'ComponentC' && <HobbiesCheckbox /> }
      {currentComponent === 'ComponentD' && <ResultComponent /> }
     
      <button className="nexxt" onClick={() => handleComponentChange("ComponentC")}>Next</button>

    
    </>
  );
}
