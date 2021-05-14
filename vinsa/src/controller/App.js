
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,  BrowserRouter  } from 'react-router-dom';
import { authService } from '../model/firebase';
import "../view/style/style.css";
import Mainpage from '../view/Mainpage';
import Loginform from '../view/Loginform';


function App() {
 
  return(
    <BrowserRouter>
     <Route path="/" component = {Mainpage} exact />
     <Route path="/Loginform" component = {Loginform} exact />

  </BrowserRouter>

  );
  }  



export default App;
