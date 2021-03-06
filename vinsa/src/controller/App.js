
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
import View_board from '../view/View_borad';
import Modify_seller from '../view/Modify_seller';
import Category from '../view/Category';
import View_product from '../view/View_product';
import buy from '../view/buy'
import view_buy from '../view/view_buy'
import view_sell from '../view/view_sell'
import Review from '../view/Review'
import Review_register from '../view/Review_register'
import View_review from '../view/View_review'
import Main from '../view/Main'


function App() {
 
  return(
    <BrowserRouter>
     <Route path="/" component = {Main} exact />
     <Route path="/Loginform" component = {Loginform} />
     <Route path="/Joinform" component = {Joinform} />
     <Route path="/Myinfo" component = {Myinfo} />
     <Route path="/Userinfo" component = {Userinfo} />
     <Route path="/Seller_board" component = {Seller_board} />
     <Route path="/Register" component = {Regiseter} />
     <Route path="/View_board" component = {View_board} />
     <Route path="/Modify_seller" component = {Modify_seller} />
     <Route path="/Category" component = {Category} />
     <Route path="/View_product" component = {View_product} />
     <Route path="/buy" component = {buy} />
     <Route path="/view_buy" component = {view_buy} />
     <Route path="/view_sell" component = {view_sell} />
     <Route path="/Review" component = {Review} />
     <Route path="/Review_register" component = {Review_register} />
     <Route path="/View_review" component = {View_review} />
     

  </BrowserRouter>

  );
  }  



export default App;
