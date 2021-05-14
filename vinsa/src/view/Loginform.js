import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRoute, Redirect, useHistory } from 'react-router-dom';
import { authService, firebaseInstance } from "../model/firebase";
import "./style/Loginform.css";


const Loginform = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const history = useHistory();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log("changed");
      if (user) {
        console.log("user login")
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        console.log("user logout")
        setIsLoggedIn(false);
      }
      setInit(true);
    });
    
  }, []);

      const onSocialClick = async (event) =>{
        const {
          target: {name},
        } = event;
        let provider;
        if(name === "Google"){
          provider = new firebaseInstance.auth.GoogleAuthProvider();

        }else if(name === "Github")
        {
          provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
      };

    return(
      <div className="backwrap">
      <div className="mainform">
      <div className="Line"></div>
      <div className="Llogo">
                             
                          </div>
        <div className="authBtns">
            <button className="authBtn" onClick={onSocialClick} name="Google">
           
              구글 계정으로 계속하기
            </button>
            <button className="authBtn" onClick={onSocialClick} name="Github">
             
              깃허브 계정으로 계속하기
            </button>
        </div>
   </div>
   <div>{isLoggedIn ? <Redirect from="/Loginform" to = {history.goBack()} />: null}</div>
   </div>

  
    )
  }


export default Loginform;