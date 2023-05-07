import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "../styles/Dashboard.css";

export default function Header() {
  

  return (
    <>
     <header class="header">
        <div class="brand">
            <h3 class="hotel-heading">OPEN DOTS</h3>
        </div>

        {/* <div class="banner">
            <h1 class="banner-heading">Welcome to Grand Hotel</h1>
            <p class="banner-paragraph">Make your life luxurious</p>
            <button class="banner-button">Check Out</button>
        </div> */}
    </header>
    </>
  );
}
