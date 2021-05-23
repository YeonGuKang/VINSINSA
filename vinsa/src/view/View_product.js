import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';

import rec from "./style/Recipe.module.css";
import noti from "./style/Notice.module.css";
import regi from "./style/Register.module.css";
import { authService , dbService ,dbstorage} from '../model/firebase';

import Header from "./Header"
import Category from "./Category";


const View_product = () => {

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
  const [imageurl1,setimageurl1]=useState("");
  const [imageurl2,setimageurl2]=useState("");
  const [imageurl3,setimageurl3]=useState("");
  const [imageurl4,setimageurl4]=useState("");
  const [imageurl5,setimageurl5]=useState("");
  const [userid,setid] =useState("");

  const [hookCatego,sethookCatego] = useState("");



  // 게시글 작성 날짜를 위함
  let today = new Date();
  
  let id;
  let Catego;
  useEffect( async () => {
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
    Catego = window.location.href.split("/")[4]
    Catego = decodeURI(Catego)
    id = window.location.href.split("/")[5]
    id=decodeURI(id)
    setid(id);
    sethookCatego(Catego)

    console.log(Catego)
    console.log(id)
    //   사용자가 선택한 게시글에 맞게 데이터를 불러옴
    const docRef = await dbService.collection('category').doc('category').collection(Catego).doc(id)

    let title;
    // 콘솔 확인해보면 해당 데이터 잘가져왔음! 훅으로 객체에 넣어서 사용할것!
    docRef.get().then(async function(doc) {  setdata(doc.data())

    


    

    var storage = dbstorage;
    var storageRef = storage.ref();
    var imageRef1 = storageRef.child(title+"1");
    var imageRef2 = storageRef.child(title+"2");
    var imageRef3 = storageRef.child(title+"3");
    var imageRef4 = storageRef.child(title+"4");
    var imageRef5 = storageRef.child(title+"5");

    setimageurl1(await imageRef1.getDownloadURL())
    setimageurl2(await imageRef2.getDownloadURL())
    setimageurl3(await imageRef3.getDownloadURL())
    setimageurl4(await imageRef4.getDownloadURL())
    setimageurl5(await imageRef5.getDownloadURL())
    });

  



    // const reader = new FileReader();

    // // Get metadata properties
    // imageRef.getMetadata().then(function(metadata) {

    //   reader.onloadend = (finishedEvent) => {
    //     console.log(finishedEvent)
    //   }

    //   reader.readAsDataURL(metadata)
    // }).catch(function(error) {
    //   // Uh-oh, an error occurred!
    // });


  }, []);


    return (
      <div className={rec.wrap}> 
           <div className={rec.half_bgs}>        
         <Header></Header>
          {/* 게시글 작성을 위한 middle부분 */}
          <div className = {regi.middle}>
            
            <form className = {regi.registerform}>
              
                <div className = {regi.Write}>
                <button><Link to={"/buy/" + hookCatego + "/" + userid}>구매하기</Link></button>
                  {/* 제목과 내용에 변화가 있는것을 value로써 onchange로 넘겨줌 */}
                    <input 
                    type = 'text'
                    value={data['name']}
                    maxLength={10} />
                     <input 
               
                    type = 'text'
                    value={data['price']}
                
                    readOnly
                    maxLength={10} />
                </div>

                <div>
                    <textarea 
           
                    className={regi.content_txt} 
                    readOnly
                    value={data['content']}
                    minLength={100} />
                </div>
                <img src={imageurl1} width='300px' height ='300px'/>
                <img src={imageurl2} width='300px' height ='300px'/>
                <img src={imageurl3} width='300px' height ='300px'/>
                <img src={imageurl4} width='300px' height ='300px'/>
                <img src={imageurl5} width='300px' height ='300px'/>
                
            </form>
  
            <div>
        </div>
        
          </div> 
          </div>           
          <div className={rec.half_bg} />  
        </div>
        
        );
  }


export default View_product;