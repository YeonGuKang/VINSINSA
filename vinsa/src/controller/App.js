
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,  BrowserRouter  } from 'react-router-dom';
import { authService } from '../model/firebase';
import "../view/style/style.css";
import Mainpage from '../view/Mainpage';
import Loginform from '../view/Loginform';
import Joinform from '../view/Joinform';
import Myinfo from '../view/Myinfo';
import Userinfo from '../view/Userinfo';
import Seller_board from '../view/Seller_board';
import Regiseter from '../view/Register';


function App() {
 
  return(
    <BrowserRouter>
     <Route path="/" component = {Mainpage} exact />
     <Route path="/Loginform" component = {Loginform} />
     <Route path="/Joinform" component = {Joinform} />
     <Route path="/Myinfo" component = {Myinfo} />
     <Route path="/Userinfo" component = {Userinfo} />
     <Route path="/Seller_board" component = {Seller_board} />
     <Route path="/Register" component = {Regiseter} />

  </BrowserRouter>

  );
  }  



export default App;
