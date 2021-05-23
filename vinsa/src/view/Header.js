import React, { useState, useEffect } from 'react';
import { authService, dbService } from '../model/firebase';
import "./style/style.css";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';


import menu from "./style/MenuBar.module.css";



const Header = () => {
 
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const [IsManager, setIsManger] = useState(false);
  const [state , setstate] = useState(false)
  const [mystate,setmystate] = useState("")
  // 운영자 UID 추가
  const Manager = ['7l8AWE2RsnZMDFdyL7vOszpVYh53']
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);

        // 본인 id 판단
        const id=user.email.split('@')[0];
        // 운영자 판단
        if(Manager.includes(user.uid))
        {
          setIsManger(true);
          setmystate("운영자")
        }
        else
        {
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
    
                if(boardArray[i]["state"] == "판매자")
                {
                  setstate(false)
                  setmystate("판매자")
                }
                else 
                {
                  setstate(true)
                  setmystate("구매자")
                }
              }
              i++
            }
  
          });
        }
      } else {
        setIsLoggedIn(false);
        setIsManger(false);
      }
      setInit(true);
       
    });
    
  }, []);

    // 로그아웃을 위한 함수를 선언
    const onLogOutClick = () => authService.signOut();


  return(
    // 로그인시 일반사용자 , 운영자를 구분
    <div>
      
     {isLoggedIn ? IsManager ? <h>관리자입니다.</h> : state ? <h>구매자입니다.</h> : <h>판매자입니다.</h> : null}
    <div className={menu.header}>
        <div className={menu.Rlogo}>
        
        </div>
            <div>
            {isLoggedIn ? IsManager ? <li><Link to={"/Myinfo"+"/"+mystate}>유저정보 조회하기</Link></li> : <li><Link to={"/Myinfo"+"/"+mystate}>내 정보 조회하기</Link></li> : null}
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