import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';

import rec from "./style/Recipe.module.css";

import regi from "./style/Register.module.css";
import { authService , dbService } from '../model/firebase';

import Header from "./Header"


const Modify_seller = () => {

    const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 게시글을 위한 title과 content
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [price, setprice] = useState("");
  const [img1, setimg1] = useState("");
  const [img2, setimg2] = useState("");
  const [img3, setimg3] = useState("");
  const [img4, setimg4] = useState("");


  // 게시글이 작성되었나 확인
  const [check, setcheck] =useState(false);
  const [data, setdata] =useState([]);

  // 게시글 작성 날짜를 위함
  let today = new Date();
  
  let id;
  useEffect(() => {
    // 스크롤 상단으로 초기화
    window.scrollTo(0, 0);
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

    // url로 넘어온 본인 state를 얻음
    id = window.location.href.split("/")[4]
    id=decodeURI(id)
    console.log(id)

    //   사용자가 선택한 게시글에 맞게 데이터를 불러옴
    const docRef = dbService.collection('board').doc('seller_board').collection("seller_board").doc(id)

    // 콘솔 확인해보면 해당 데이터 잘가져왔음! 훅으로 객체에 넣어서 사용할것!
    docRef.get().then(function(doc) {  setdata(doc.data())});


    
    
  }, []);

  // 버튼 클릭이 있을때 게시글을 추가해줌
  const onclick = async (event) => {
    event.preventDefault();

    const data={
      name:title,
      content:content,
      // 현재 날짜를 이런식으로 추가해준다
      createdAt:today.toLocaleDateString('en-US') +' ' + today.toLocaleTimeString('en-US'),
      writer: userObj.email.split('@')[0],
      price:price,
      admit:"심사 대기"
  }

    // url로 넘어온 본인 state를 얻음
    id = window.location.href.split("/")[4]
    id=decodeURI(id)
    console.log(id)

    await  dbService.collection("board").doc('seller_board').collection("seller_board").doc(id).update(data);

    settitle("");
    setcontent("");
    // 게시글을 추가하였으니 true로 변환
    setcheck(true);
  };

  // title과 content의 값을 변환해준다
  const onChange_title = (event) => {
    const {
      target: { value },
    } = event;
    settitle(value)
  };

  const onChange_content = (event) => {

    let {
      target: { value },
    } = event;

    

    setcontent(value)
  };

   // title과 content의 값을 변환해준다
   const onChange_price = (event) => {
    const {
      target: { value },
    } = event;
    setprice(value)
  };

  console.log(data['name'])

    return (
      <div className={rec.wrap}> 
           <div className={rec.half_bgs}>        
         <Header></Header>
          {/* 게시글 작성을 위한 middle부분 */}
          <div className = {regi.middle}>
            <form className = {regi.registerform}>
                <div className = {regi.Write}>
                  {/* 제목과 내용에 변화가 있는것을 value로써 onchange로 넘겨줌 */}
                    <input 
                    onChange={onChange_title}
                    type = 'text'
                    value={title}
                
                    placeholder={data['name']}
                    maxLength={10} />
                     <input 
                    onChange={onChange_price}
                    type = 'text'
                    value={price}
                
                    placeholder={data['price']}
                    maxLength={10} />
                </div>

                <div>
                    <textarea 
                    onChange={onChange_content}
                    className={regi.content_txt} 
                    placeholder={data['cotent']}
                    type = 'text'
                    value={content}
                    minLength={100} />
                </div>
                
                <button onClick={onclick} className = {regi.registerbtn}>
                Modify
                </button>

            {/* 게시글이 작성되었나 판단해서 작성된 경우에는 redirect로 게시판 페이지로 이동 */}
                <div>{check ? <Redirect from="/Register" to = "/Seller_board" />: null}
                </div>
            </form>  
            <div>
        </div>
          </div> 

          </div>           
          <div className={rec.half_bg} />  
        </div>
        );
  }


export default Modify_seller;