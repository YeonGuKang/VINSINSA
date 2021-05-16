import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRoute, Redirect, useHistory } from 'react-router-dom';
import { dbService,authService } from "../model/firebase";


const Joinform = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const history = useHistory();

  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [birth, setbirth] = useState("");
  const [sex, setsex] = useState("");
  const [email, setemail] = useState("");
  const [state, setstate] = useState("");
  
  // 게시글이 작성되었나 확인
  const [check, setcheck] = useState(false);

  let boardArray = []
    const [temp, settemp] = useState([]);

  useEffect(() => {

     dbService.collection("user").onSnapshot((snapshot) => {
      boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      settemp(boardArray)

    })
    });


   // 버튼 클릭이 있을때 게시글을 추가해줌
   const onclick = async () => {


    const data = {
      id: id,
      password: password,
      name: name,
      birth: birth,
      sex: sex,
      email: email,
      state: state
    }

    await dbService.collection("user").doc(id).set(data);
    const data2 = await authService.createUserWithEmailAndPassword(
        id+"@naver.com",
        password
    )

    setcheck(true);

    console.log(data)
}

  const id_overlap_check = () => {

    let i=0;
    while(i < temp.length)
    {
      if (temp[i]['id'] == id) {
        alert("이미 존재하는 ID입니다.")
        break
      }
      i++
    }
    if(i == temp.length)
        alert("사용가능한 ID입니다.")

  }


  
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


  const onChange_name = (event) => {
    const {
      target: { value },
    } = event;
    setname(value)
  };

  const onChange_birth = (event) => {
    const {
      target: { value },
    } = event;
    setbirth(value)
  };

  const onChange_sex = (event) => {
    const {
      target: { value },
    } = event;
    setsex(value)
  };

  const onChange_email = (event) => {
    const {
      target: { value },
    } = event;
    setemail(value)
  };

  const onChange_state = (event) => {
    const {
      target: { value },
    } = event;
    setstate(value)
  };



      
    return(
        <div>
       <section>
    <h1>회원가입 페이지</h1>
  </section>
      ID<br></br>
      <input onChange={onChange_id} type="text" value={id}/>
      &nbsp;<button onClick={id_overlap_check} value="duple"> 중복확인 </button>

      <br></br>
      비밀번호<br></br>
      <input onChange={onChange_password} type="password"  value={password}/>
      <br></br>
      이름  <br></br>
      <input onChange={onChange_name} type="text" value={name}/><br></br>
      생년월일<br></br>
      <input onChange={onChange_birth} type="text"  placeholder="ex)19980611" value={birth}/><br></br>
      <br></br>
      성별<br></br>
      <input onChange={onChange_sex} type="text"  value={sex}/><br></br>
      이메일<br></br>
      <input onChange={onChange_email} type="email" placeholder="email@gmail.com" value={email}/><br></br>
      판매자 또는 구매자 입력<br></br>
      <input onChange={onChange_state} type="text"  value={state}/><br></br>

  
  <button onClick={onclick} >
              SIGN UP
                </button>

                {/* 게시글이 작성되었나 판단해서 작성된 경우에는 redirect로 게시판 페이지로 이동 */}
            <div>{check ? <Redirect from="/Joinform" to="/Loginform" /> : null}</div>
  </div>
    )
  }


export default Joinform;