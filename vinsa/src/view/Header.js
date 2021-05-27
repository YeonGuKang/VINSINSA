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
  const [Isseller,setIsseller] = useState(false)
  // 운영자 UID 추가
  const Manager = ['58IzMNK9QdXuRaReEdEVyIVDGss2']
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
                  setstate(true)
                  setmystate("판매자")
                  setIsseller(true)
                }
                else 
                {
                  setstate(false)
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
       <h1 className={menu.logo2}><Link to="/">&nbsp;VINSINSA</Link></h1>
     {isLoggedIn ? IsManager ? <h className={menu.logo2}>&nbsp;&nbsp;관리자입니다.</h> : state ? <h className={menu.logo2}>&nbsp;&nbsp;판매자입니다.</h> : <h className={menu.logo2}>&nbsp;&nbsp;구매자입니다.</h> : null}
    <div className={menu.header}>
        <div className={menu.Rlogo}>
        
        </div>
            <div>
                <ul className={menu.nav}>
                    <li><Link to="/Category">Category</Link></li>
                    {Isseller ? <li><Link to="/view_sell">판매목록조회</Link></li> : <li><Link to={"/view_buy"}>구매목록조회</Link></li>}
                     <li><Link to="/Review">리뷰</Link></li>
                    {Isseller ? <li><Link to="/Seller_board">판매자 게시판</Link></li> : null}
                    {isLoggedIn ? IsManager ? <li><Link to={"/Myinfo"+"/"+mystate}>유저정보 조회하기</Link></li> : <li><Link to={"/Myinfo"+"/"+mystate}>내 정보 조회하기</Link></li> : null}
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