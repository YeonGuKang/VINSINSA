import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';


import { authService , dbService } from '../model/firebase';
import Header from "./Header"


import "./style/style.css";


let mystate;

const View_buy = () => {
   
const [IsManager, setIsManager] = useState(false);
const [All_info, setAll_info] = useState([]);
const [My_info, setMy_info] = useState([]);

const [data, setdata] =useState([]);
const [myID,setmyID] = useState("");

const [check,setcheck] = useState(false);
const [userObj, setUserObj] = useState(null);

let Catego,id

  useEffect( () => {
    authService.onAuthStateChanged( (user) => {
        if (user) {
      // url로 넘어온 본인 state를 얻음
      mystate = window.location.href.split("/")[4]
      mystate=decodeURI(mystate)

    }


    });
    const id=authService.currentUser.email.split('@')[0]; // 본인 id 판단
    setmyID(id)
    console.log(id)
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
            setcheck(true)
            }
            i++
        }
      });
  }, []);


return(
  <div>
    <Header></Header>
    <div className="backwrap">
    <div className="mainform">

    {check ? My_info['구매목록'].map((Show)=>(
            <li>{Show} : 배송 준비 중</li>
      )):null }

    
      <div className="authBtns">
      
      </div>
  </div>
      
  </div>
  </div>

);



}

 export default View_buy;