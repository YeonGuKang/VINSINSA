import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';

import rec from "./style/Recipe.module.css";
import noti from "./style/Notice.module.css";
import regi from "./style/Register.module.css";
import { authService , dbService ,dbstorage} from '../model/firebase';

import Header from "./Header"


const View_board = () => {

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
    const docRef = await dbService.collection('board').doc('seller_board').collection("seller_board").doc(id)

    let title;
    // 콘솔 확인해보면 해당 데이터 잘가져왔음! 훅으로 객체에 넣어서 사용할것!
    docRef.get().then(async function(doc) {  setdata(doc.data())
    title = doc.data()['img_name']
    console.log(title)

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

  




  }, []);

const onclick = async () => {
  setcheck(true)
  if(window.confirm("정말로 삭제하시겠습니까?")){
      await dbService.collection('board').doc('seller_board').collection("seller_board").doc(userid).delete()

      alert("삭제가 완료되었습니다.")
  }
}
    return (
      <div className={rec.wrap}> 
           <div className={rec.half_bgs}>        
         <Header></Header>
          {/* 게시글 작성을 위한 middle부분 */}
          <div className = {regi.middle}>
            <form className = {regi.registerform}>
                <div className = {regi.Write}>
                  <h1>{data ? data['name'] : null}</h1>
                  <h1>{data ? data['price'] : null}원</h1>
                  

                           <button className={rec.productbtn} ><Link to={"/Modify_seller/" + userid}>수정하기</Link></button>
                           <button onClick={onclick} className={rec.productbtn}>
                삭제하기
                </button>
                </div>

                <div>
                    <textarea 
           
                    className={regi.content_txt2} 
       
                    value={data ? data['content'] : null}
                    minLength={100} />
                </div>
                <img src={imageurl1 ? imageurl1 : null} width='600px' height ='500px'/>
                <h1 className={rec.detail}>상세사진</h1>
                <img src={imageurl2 ? imageurl2 : null} className={rec.subimage} width='300px' height ='300px'/>
                <img src={imageurl3 ? imageurl3 : null} className={rec.subimage} width='300px' height ='300px'/>
                <img src={imageurl4 ? imageurl4 : null} className={rec.subimage} width='300px' height ='300px'/>
            </form>  
            <div>
        </div>
          </div> 
          <div className={noti.register}>{ }</div>    
      

                <div>{check ? <Redirect from="/View_board" to = "/Seller_board" />: null}
                </div>
          </div>           
          <div className={rec.half_bg} />  
        </div>
        );
  }


export default View_board;