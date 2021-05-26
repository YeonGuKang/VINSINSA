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

  
      setcheck(true)
  
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


// 좋아요 함수
const like = async () => {

  const temp = authService.currentUser.email.split("@")[0]
  // 현재 해당유저의 좋아요 정보를 가져옴
  const res = await dbService.collection('user').doc(temp).collection('좋아요').doc(data['name']).get();

  const data = {
        like : true
        };

        
      //  현재 타입의 레시피 like 정보를 가져옴
      const type_data =  await dbService.collection('category').doc('category').collection(hookCatego).doc(userid).get();
      let current_like = type_data.data().찜

    // 만약에 해당 레시피의 좋아요를 이미 누른경우
    if(res.data()!=undefined)
      {
      // 확인을 누르면 실행
      if(window.confirm('이미 좋아요 한 레시피입니다! 좋아요를 취소 하시겠습니까?')){
        // 좋아요에서 해당하는 레시피를 삭제
        await dbService.collection('user').doc(temp).collection('좋아요').doc(data['name']).delete();

        // merge와 현재 type 레시피의 like를 1씩 뺌
        await dbService.collection('category').doc('category').collection(hookCatego).doc(userid).update({찜 : current_like - 1});


        alert('좋아요가 삭제 되었습니다!')
        }
      }
    // 좋아요를 누른적이 없을 경우 실행
      else{
        console.log(current_like)
        if(current_like == undefined)
        {
          current_like = 0;
        }

      //  merge와 해당 type의 레시피 like를 1씩증가
     // await dbService.collection('category').doc('category').collection(hookCatego).doc(userid).update({찜 : current_like + 1});


      await dbService.collection('user').doc(temp).collection('좋아요').doc(data['name']).set(data)

      alert('좋아요가 완료 되었습니다!')
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
                <button><Link to={"/buy/" + hookCatego + "/" + userid}>구매하기</Link></button>
                <button onClick={like}>추천하기!</button>
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

                <div>{
                    <textarea 
           
                    className={regi.content_txt} 
                    readOnly
                    value={data['content']}
                    minLength={100} />}
                </div>
                <img src={data['img1']} width='300px' height ='300px'/>
                <img src={data['img2']} width='300px' height ='300px'/>
                <img src={data['img3']} width='300px' height ='300px'/>
                <img src={data['img4']} width='300px' height ='300px'/>

                
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