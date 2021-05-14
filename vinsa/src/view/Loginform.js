import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRoute, Redirect, useHistory } from 'react-router-dom';
import { authService, dbService } from "../model/firebase";
import "./style/Loginform.css";


const Loginform = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const history = useHistory();

  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  
  const [user, setuser] = useState(null);
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


    // 첫 화면에 merge에서 가져온 값을 나타냄
    dbService.collection("user").onSnapshot((snapshot) => {
      const boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setuser(boardArray)
    });
    
  }, []);

  // 버튼 클릭이 있을때 게시글을 추가해줌
  const onclick = async (event) => {
    event.preventDefault();

    let i=0;
    let data
    while(i<user.length)
    {
      console.log(user[i]['id'])
      console.log(id)
      if(user[i]['id'] == id)
      {
        if(user[i]['password'] == password)
        {
          data = await authService.signInWithEmailAndPassword(
            id+"@naver.com",
            password
          )
        }
      }
      i++
    }
  

}

      // const onSocialClick = async (event) =>{
      //   const {
      //     target: {name},
      //   } = event;
      //   let provider;
      //   if(name === "Google"){
      //     provider = new firebaseInstance.auth.GoogleAuthProvider();

      //   }else if(name === "Github")
      //   {
      //     provider = new firebaseInstance.auth.GithubAuthProvider();
      //   }
      //   const data = await authService.signInWithPopup(provider);
      //   console.log(data);
      // };

       
  const onChange_id = (event) => {
    const {
      target: { value },
    } = event;
    setid(value)
  };

  const onChange_password = (event) => {
    const {
      target: { value },
    } = event;
    setpassword(value)
  };

    return(
      <div className="backwrap">
      <div className="mainform">
    
      ID<br></br>
      <input onChange={onChange_id} type="text" value={id}/>
      <br></br>
      비밀번호<br></br>
      <input onChange={onChange_password} type="password"  value={password}/>
      <br></br>

      <button onClick={onclick} >
              로그인
                </button>
     
        <div className="authBtns">
        <li><Link to="/Joinform">회원가입</Link></li>
            {/* <button className="authBtn" onClick={onSocialClick} name="Google">
           
              구글 계정으로 계속하기
            </button>
            <button className="authBtn" onClick={onSocialClick} name="Github">
             
              깃허브 계정으로 계속하기
            </button> */}
        </div>
   </div>
   <div>{isLoggedIn ? <Redirect from="/Loginform" to = {history.goBack()} />: null}</div>
   </div>

  
    )
  }


export default Loginform;