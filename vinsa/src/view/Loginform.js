import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRoute, Redirect, useHistory } from 'react-router-dom';
import { authService, dbService , firebaseInstance} from "../model/firebase";
import Header from "./Header";
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

      const onSocialClick = async (event) =>{
        const {
          target: {name},
        } = event;
        let provider;
        if(name === "Google"){
          provider = new firebaseInstance.auth.GoogleAuthProvider();

        }else if(name === "Github")
        {
          provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
      };

       
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
      <div>
        <Header></Header>
      <div className="backwrap">
      <div className="mainform2">

 <br></br>
      <h1> 로그인 </h1>
        <br></br>
      <h3>ID</h3>
      <input onChange={onChange_id} type="text" value={id}/>
      <h3>비밀번호</h3>
      <input onChange={onChange_password} type="password"  value={password}/>
      <br></br>
      <br></br>


     
        <div className="authBtns">


        <button className="authBtn" onClick={onclick} name="Login">
              로그인
        </button>
        <button className="authBtn" onClick={onSocialClick} name="Google">
              구글 계정으로 로그인
        </button>
        <button className="authBtn" name="Join">
              <div className="joinButtonColor">
                <Link to="/Joinform">회원가입</Link>
              </div>
        </button>


        </div>
   </div>
   <div>{isLoggedIn ? <Redirect from="/Loginform" to = {history.goBack()} />: null}</div>
   </div>
</div>
  
    )
  }


export default Loginform;