import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';


import { authService , dbService } from '../model/firebase';


import "./style/style.css";

import menu from "./style/MenuBar.module.css";
import Header from "./Header"




const Mainpage = () => {
 


  

  useEffect(() => {
 
   
  }, []);




    return(
            <div className="wrap">

                  <div className={menu.LGbgr}>
                    <Header></Header>
              </div>  
                  <div className="midle">
                
                  <div className="slideshow-container">
                  <div className="greentrans">
                    
                    </div>
                  
                  </div>
                  <div className="about_btn">
                     
                      <div className="btn">
                       
                      </div>
                    </div>    
                  </div>

                  <div className="lat">
                    <section className="visual">
                      
                  </section>
                   
                  </div>
           </div>

    );
    

 
    }

 export default Mainpage;