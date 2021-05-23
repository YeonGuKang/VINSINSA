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
        {IsManager ? null : <h1>아이디 : {My_info.id}</h1>}
        {IsManager ? null :<h1>이메일 :  {My_info.email}</h1>}
        {IsManager ? null :<h1>생일 :  {My_info.birth}</h1>}
        {IsManager ? null :<h1>이름 :  {My_info.name}</h1>}
        {IsManager ? null :<h1>성별 :  {My_info.sex}</h1>}
        {IsManager ? null :<h1>주소 :  {My_info.address}</h1>}
        {IsManager ? null :<h1>{My_info.state}</h1>}
    
        {IsManager ? <h1>회원 수 : {All_info.length}</h1>: null}
        {IsManager ? <h5>회원관리시 회원아이디 클릭</h5>: null}
        {All_info.map((Show)=>(
                <li>아이디 : <Link to={"/Userinfo"+"/"+Show.id}>{Show.id}</Link></li>
         ))}

       
          <div className="authBtns">
         
          </div>
     </div>
     </div>

    );
    

 
    }

 export default Myinfo;