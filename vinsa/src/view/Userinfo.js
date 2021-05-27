import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter ,Redirect } from 'react-router-dom';


import { authService , dbService } from '../model/firebase';


import "./style/style.css";

import menu from "./style/MenuBar.module.css";
import Header from "./Header"

let userstate;

const Userinfo = () => {
   
    const [check,setcheck] = useState(false);
const [User_info, setMy_info] = useState([]);


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


const delete_user = async () =>{
    if (window.confirm('유저를 삭제하겠습니까 ?')) {
        // 좋아요에서 해당하는 레시피를 삭제
        await dbService.collection('user').doc(User_info.id).delete();
        alert('유저가 성공적으로 삭제되었습니다!')

        setcheck(true)

      }
}



    return(
      <div>
      <Header></Header>
        <div className="backwrap">
        <div className="mainform">

        <h2 align="center">유저 정보 조회</h2>
        <table width="463px" height="300px" border="1px">
          <tbody>
            <tr>
              <td width="130px"><h4>&nbsp;아이디</h4></td><td>&nbsp;{User_info.id}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;이메일</h4></td><td>&nbsp;{User_info.email}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;생일</h4></td><td>&nbsp;{User_info.birth}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;이름</h4></td><td>&nbsp;{User_info.name}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;성별</h4></td><td>&nbsp;{User_info.sex}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;주소</h4></td><td>&nbsp;{User_info.address}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;구분</h4></td><td>&nbsp;{User_info.state}</td>
            </tr>
          </tbody>
        </table>

        <h3 className={menu.user_delete_color} onClick={delete_user} align="right"><Link to="/Myinfo/운영자">유저 삭제하기&nbsp;</Link></h3>
       
          <div className="authBtns">
          </div>
     </div>
     <div>{check ? <Redirect from="/Userinfo" to = '/Myinfo/운영자' />: null}</div>
     
     </div>

     
</div>
    );
    

 
    }

 export default Userinfo;