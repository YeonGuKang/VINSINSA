import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';

import rec from "./style/Recipe.module.css";
import noti from "./style/Notice.module.css";
import regi from "./style/Register.module.css";
import { authService , dbService ,dbstorage} from '../model/firebase';

import Header from "./Header"


const View_review = () => {

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

  // 게시글 작성 날짜를 위함
  let today = new Date();
  
  let id;
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
    id = window.location.href.split("/")[4]
    id=decodeURI(id)
    setid(id);
    console.log(id)

    //   사용자가 선택한 게시글에 맞게 데이터를 불러옴
    const docRef = await dbService.collection('board').doc('board').collection("review").doc(id)

    let title;
    // 콘솔 확인해보면 해당 데이터 잘가져왔음! 훅으로 객체에 넣어서 사용할것!
    docRef.get().then(async function(doc) {  setdata(doc.data())
    title = (doc.data()['title'])
   

    var storage = dbstorage;
    var storageRef = storage.ref();
    var imageRef1 = storageRef.child("리뷰_"+title+"1");


    setimageurl1(await imageRef1.getDownloadURL())


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

const onclick = async () => {

  setcheck(true)
  if(window.confirm("정말로 삭제하시겠습니까?")){
      await dbService.collection('board').doc('board').collection("review").doc(userid).delete()

      alert("삭제가 완료되었습니다.")
  }
}
    return (
      <div className={rec.wrap}> 
           <div className={rec.half_bgs}>        
         <Header></Header>
          {/* 게시글 작성을 위한 middle부분 */}
          <div className = {regi.middle}>

          <img src={imageurl1} width='500px' height ='500px' />
            <form className = {regi.registerform}>
                <div className = {regi.Write}>
                  {/* 제목과 내용에 변화가 있는것을 value로써 onchange로 넘겨줌 */}
                  <h1>상품명 : {data ? data['title'] : null}</h1>
                  <h1>평점 : {data ? data['평점'] : null}</h1>
                </div>
                <div>
                    <textarea 
           
                    className={regi.content_txt} 
       
                    value={data ? data['content'] : null}
                    minLength={100} />
                </div>
                <button onClick={onclick} className = {regi.registerbtn}>
                삭제하기
                </button>
            </form>  
            
            <div>
        </div>
          </div> 
            <div>{check ? <Redirect from="/View_review" to = "/Review" />: null}
            </div>

          </div>           
          <div className={rec.half_bg} />  
        </div>
        );
  }


export default View_review;