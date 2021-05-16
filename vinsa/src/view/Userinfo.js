import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';


import { authService , dbService } from '../model/firebase';


import "./style/style.css";

import menu from "./style/MenuBar.module.css";
import Header from "./Header"

let userstate;

const Userinfo = () => {
   
const [IsManager, setIsManager] = useState(false);
const [All_info, setAll_info] = useState([]);
const [My_info, setMy_info] = useState([]);


  useEffect(() => {
    
    authService.onAuthStateChanged((user) => {
        if (user) {
      // url로 넘어온 본인 state를 얻음
      userstate = window.location.href.split("/")[4]
      userstate=decodeURI(userstate)

      console.log(userstate)

        dbService.collection("user").onSnapshot((snapshot) => {
            const boardArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            let i=0;
            while(i<boardArray.length)
            {
                if(boardArray[i]['id'] == userstate)
                {
                console.log(boardArray[i])
                setMy_info(boardArray[i])
                }
                i++
            }
            });
    

    }

    });
  }, []);






    return(
        <div className="backwrap">
        <div className="mainform">
        <li>{My_info.id}</li>
        <li>{My_info.email}</li>
        <li>{My_info.birth}</li>
        <li>{My_info.name}</li>
        <li>{My_info.sex}</li>
        <li>{My_info.state}</li>
    
       
          <div className="authBtns">
              {/* <button className="authBtn" onClick={onSocialClick} name="Google">
             
                구글 계정으로 계속하기
              </button>
              <button className="authBtn" onClick={onSocialClick} name="Github">
               
                깃허브 계정으로 계속하기
              </button> */}
          </div>
     </div>
     </div>

    );
    

 
    }

 export default Userinfo;