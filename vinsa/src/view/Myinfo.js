import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';


import { authService , dbService } from '../model/firebase';


import "./style/style.css";

import menu from "./style/MenuBar.module.css";
import Header from "./Header"

let mystate;

const Myinfo = () => {
   
const [IsManager, setIsManager] = useState(false);
const [All_info, setAll_info] = useState([]);
const [My_info, setMy_info] = useState([]);


  useEffect(() => {
    
    authService.onAuthStateChanged((user) => {
        if (user) {
      // url로 넘어온 본인 state를 얻음
      mystate = window.location.href.split("/")[4]
      mystate=decodeURI(mystate)

      if(mystate == "운영자")
      {
        setIsManager(true)
        dbService.collection("user").onSnapshot((snapshot) => {
            const boardArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAll_info(boardArray)
          });
      }
      else
      {
        const id=user.email.split('@')[0]; // 본인 id 판단
        dbService.collection("user").onSnapshot((snapshot) => {
            const boardArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            let i=0;
            while(i<boardArray.length)
            {
              if(boardArray[i]['id'] == id)
              {
                console.log(boardArray[i])
                setMy_info(boardArray[i])
              }
              i++
            }
          });
      }

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
        <li>{My_info.address}</li>
        <li>{My_info.state}</li>
    
        {All_info.map((Show)=>(
         
                <li><Link to={"/Userinfo"+"/"+Show.id}>{Show.id}</Link></li>
           
         ))}

       
          <div className="authBtns">
         
          </div>
     </div>
     </div>

    );
    

 
    }

 export default Myinfo;