import React, { useState, useEffect } from 'react';
import { authService } from '../model/firebase';
import "./style/style.css";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';


import menu from "./style/MenuBar.module.css";



const Header = () => {
 
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [IsManager, setIsManger] = useState(false);
  // 운영자 UID 추가
  const Manager = ['swe0dmffFQcoqpEUJ7fHtXYimEJ3','WFS2QtP4kEN3IWscNXtD1Ciso1t2','8s8IU2fnLPe5q0nIUheiZkwpMOk2','7a2QhDJ4gjbysYsQoFP5QbAIYhz2']
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        // 운영자 판단
        if(Manager.includes(user.uid))
        {
          setIsManger(true);
        }
      } else {
        setIsLoggedIn(false);
        setIsManger(false);
      }
      setInit(true);
       
      console.log(user)
    });
    
  }, []);

    // 로그아웃을 위한 함수를 선언
    const onLogOutClick = () => authService.signOut();


  return(
    // 로그인시 일반사용자 , 운영자를 구분
    <div>
     {isLoggedIn ? IsManager ? <h>운영자입니다.</h> : <h>일반사용자입니다.</h> : null}
    <div className={menu.header}>
        <div className={menu.Rlogo}>
            {/* js에서는 img를 이런식으로 import해서 불러온다. */}
            <a href="/Checipe">
           
              </a>
        </div>
            <div>
                <ul className={menu.nav}>
                    <li><Link to="/Category">Category</Link></li>
                    <li><Link to="/Notice">공지사항</Link></li>
                     <li><Link to="/Review">리뷰</Link></li>
                     <li><Link to="/Q&A">Q&A</Link></li>
                     <li><Link to="/Seller_board">판매자 게시판</Link></li>
                </ul>
            </div>
       
            <div className={menu.login}>
              {/* 로그인이 되어있는 상태라면 로그아웃 , 아니라면 로그인 버튼을 보여줌 */}
              {isLoggedIn ?  <Link to="/">
                   <li onClick={onLogOutClick}>로그아웃</li>
              </Link> : <Link to="/Loginform">
                   <li>로그인</li>
              </Link> }

            </div>      
 </div>
 </div>


           
  );
  }  


export default Header;