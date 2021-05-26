import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';

import rec from "./style/Recipe.module.css";
import regi from "./style/Register.module.css";
import { authService , dbService, dbstorage } from '../model/firebase';


import Header from "./Header"

// 게시글을 등록하는 component

const Register = () => {

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
  const [metadata, setmetadata] = useState("");

  const [My_info, setMy_info] = useState([]);

const [data, setdata] =useState([]);
const [myID,setmyID] = useState("");

  // 게시글 작성 날짜를 위함
  let today = new Date();
  
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

    const id=authService.currentUser.email.split('@')[0]; // 본인 id 판단
    setmyID(id)
    console.log(id)
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
      img_name:title,
      admit:"심사 대기"
  }

    await  dbService.collection("board").doc('seller_board').collection("seller_board").doc().set(data);

    console.log(My_info['id'])

    const ref = dbService.collection("user").doc(My_info['id'])
  
    ref.get().then( async function(doc) { 

      let t_data = doc.data()['판매등록목록']
      t_data.push(data['name'])
      console.log(t_data)
      
      await dbService.collection('user').doc(My_info['id']).update({"판매등록목록" : t_data})


      });



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

  const image_upload1 = async (event) => {
    
  var storageRef = dbstorage.ref();

  // Create a reference to 'mountains.jpg'
  var mountainsRef = storageRef.child(title+"1");

  console.log(event.target.files)
  var file = event.target.files[0]
  await mountainsRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });


  }

  const image_upload5 = async (event) => {
    
    var storageRef = dbstorage.ref();
  
    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child(title+"5");
  
    console.log(event.target.files)
    var file = event.target.files[0]
    await mountainsRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  
  
    }

    const image_upload2 = async (event) => {
    
      var storageRef = dbstorage.ref();
    
      // Create a reference to 'mountains.jpg'
      var mountainsRef = storageRef.child(title+"2");
    
      console.log(event.target.files)
      var file = event.target.files[0]
      await mountainsRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });
    
    
      }

      const image_upload3 = async (event) => {
    
        var storageRef = dbstorage.ref();
      
        // Create a reference to 'mountains.jpg'
        var mountainsRef = storageRef.child(title+"3");
      
        console.log(event.target.files)
        var file = event.target.files[0]
        await mountainsRef.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
        });
      
      
        }

        const image_upload4 = async (event) => {
    
          var storageRef = dbstorage.ref();
        
          // Create a reference to 'mountains.jpg'
          var mountainsRef = storageRef.child(title+"4");
        
          console.log(event.target.files)
          var file = event.target.files[0]
          await mountainsRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
          });
        
        
          }

    return(           
        <div className={rec.wrap}> 
           <div className={rec.half_bgs}>        
         <Header></Header>
          {/* 게시글 작성을 위한 middle부분 */}
          <div className = {regi.middle}>
            
            <form className = {regi.registerform}>
                <div className = {regi.Write}>
                    
                <input type='file' onChange={image_upload1} />
                <input type='file' onChange={image_upload2} />
                <input type='file' onChange={image_upload3} />
                <input type='file' onChange={image_upload4} />
  
             
                </div>

                <div>
                    <textarea 
                    onChange={onChange_content}
                    className={regi.content_txt} 
                    placeholder='오염 및 하자를 정확히 입력해주세요.'
                    type = 'text'
                    value={content}
                    minLength={100} />
                </div>
     {/* 제목과 내용에 변화가 있는것을 value로써 onchange로 넘겨줌 */}
     <input 
                    onChange={onChange_title}
                    type = 'text'
                    value={title}
                
                    placeholder='상품명'
                    maxLength={10} />
                     <input 
                    onChange={onChange_price}
                    type = 'text'
                    value={price}
                
                    placeholder='희망 가격'
                    maxLength={10} />
                    
            {/* 게시글이 작성되었나 판단해서 작성된 경우에는 redirect로 게시판 페이지로 이동 */}
                <div>{check ? <Redirect from="/Register" to = "/Seller_board" />: null}
                </div>
            </form>  
            
            <div>
              
        </div>
        
          </div>              
          <button onClick={onclick} className = {regi.registerbtn2}>
                Register
                </button>
          </div>           
          <div className={rec.half_bg} />  
        </div>
        
      
);
}


export default Register;