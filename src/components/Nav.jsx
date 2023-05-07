import React ,{useState}from 'react';
import "../styles/Nav.css"
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Nav(props){

    const { currentUser, logout } = useAuth();
    const history = useHistory()
    const [error, setError] = useState("");
    const handleButtonClick = (componentName) => {
        props.onComponentChange(componentName);
      }

    async function handleLogout() {
        console.log("done")
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
         <div id="bottom-nav">
        <a data-active="true" href="#">
          <i class="fa-solid fa-tag">11</i>
        </a>
        <a href="#">
          <i class="fa-solid fa-newspaper">11</i>
        </a>
        <a href="#">
          <i class="fa-solid fa-shield">11</i>
        </a>
        <a href="#">
          <i class="fa-solid fa-bell">1</i>
        </a>
        <a href="#">
          <i class="fa-regular fa-bars">11</i>
        </a>
      </div>
        <div class="navbar">

<input type="checkbox" class="checkbox" id="click" hidden/>


<div className="sidebar">
    <label for="click">
        <div class="menu-icon">
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
        </div>
    </label>

    <ul class="social-icons-list">
        <li onClick={() => handleButtonClick('ComponentA')}>
        
          <img src="https://assets.codepen.io/9277864/logout.svg" alt="Logout Icon" width="28" height="30" />
          <span>Home</span>
      
        </li>
        <li onClick={() => handleButtonClick('ComponentB')}>
        
          <img src="https://assets.codepen.io/9277864/logout.svg" alt="Logout Icon" width="28" height="30" />
          <span>Dots</span>
        
        </li>
       
        <li onClick={() => handleButtonClick('ComponentD')}>
        
        <img src="https://assets.codepen.io/9277864/logout.svg" alt="Logout Icon" width="28" height="30" />
        <span>Connect</span>
      
      </li>
        <li onClick={handleLogout}>
        
          <img src="https://assets.codepen.io/9277864/logout.svg" alt="Logout Icon" width="28" height="30" />
          <span>Logout</span>
        
        </li>
    </ul>

    <div class="year">
        <p>2023</p>
    </div>
</div>


</div>
        </>
    )
}