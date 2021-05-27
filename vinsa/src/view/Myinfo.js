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
        let num = 1

      if(mystate == "운영자")
      {
        setIsManager(true)
        dbService.collection("user").onSnapshot((snapshot) => {
            const boardArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              num: num++,
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
      <div>
        <Header></Header>
        <div className="backwrap">
        <div className="mainform">

    <h2 align="center">{IsManager ? "유저 정보 조회하기" : "내 정보 조회하기"}</h2>
    { IsManager ? null :
    <table width="463px" height="300px" border="1px">
      <tbody>
        <tr>
          <td width="100px"><h4>&nbsp;아이디</h4></td><td>{IsManager ? null : <h>&nbsp;{My_info.id}</h>}</td>
        </tr>
        <tr>
          <td><h4>&nbsp;이메일</h4></td><td>{IsManager ? null : <h>&nbsp;{My_info.email}</h>}</td>
        </tr>
        <tr>
          <td><h4>&nbsp;생일</h4></td><td>{IsManager ? null : <h>&nbsp;{My_info.birth}</h>}</td>
        </tr>
        <tr>
          <td><h4>&nbsp;이름</h4></td><td>{IsManager ? null : <h>&nbsp;{My_info.name}</h>}</td>
        </tr>
        <tr>
          <td><h4>&nbsp;성별</h4></td><td>{IsManager ? null : <h>&nbsp;{My_info.sex}</h>}</td>
        </tr>
        <tr>
          <td><h4>&nbsp;주소</h4></td><td>{IsManager ? null : <h>&nbsp;{My_info.address}</h>}</td>
        </tr>
      </tbody>
    </table> }


    <h3>&nbsp;총 회원 수 : {All_info.length}</h3>
    <h5>&nbsp;회원 관리 시 회원아이디를 클릭하세요.</h5>
    <table width="463px" height="300px" border="1px">
      <thead>
        <tr>
          <th>회원 번호</th><th>아이디</th>
        </tr>
      </thead>
      <tbody>
      {All_info.map((Show)=>(
        <tr>
          <td width="120px" align="center"><h4>&nbsp;{Show.num}</h4></td><td align="center">&nbsp;<Link to={"/Userinfo"+"/"+Show.id}>{Show.id}</Link></td>
        </tr>
      ))}

      </tbody>
    </table>





       
          <div className="authBtns">
         
          </div>
     </div>
     </div>
</div>
    );
    

 
    }

 export default Myinfo;