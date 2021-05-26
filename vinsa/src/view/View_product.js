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
  const [like_check, setlike_check] =useState(false);
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
    if(id[id.length-1]=="?")
    {
      id=id.slice(0,id.length-1)
      console.log(id)
    }
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
  

    });

  

  }, []);


// 좋아요 함수
const like = async (event) => {

  event.preventDefault();
 

    // url로 넘어온 본인 state를 얻음
    Catego = window.location.href.split("/")[4]
    Catego = decodeURI(Catego)
    id = window.location.href.split("/")[5]
    if(id[id.length-1]=="?")
    {
      id=id.slice(0,id.length-1)
      console.log(id)
    }
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


    const temp = authService.currentUser.email.split("@")[0]
    // 현재 해당유저의 좋아요 정보를 가져옴
    const res = await dbService.collection('user').doc(temp).collection('좋아요').doc(doc.data()['name']).get();

    console.log(doc.data()['name']);

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
      if(window.confirm('이미 찜 한 의류입니다! 찜을 취소 하시겠습니까?')){
        // 좋아요에서 해당하는 레시피를 삭제
        await dbService.collection('user').doc(temp).collection('좋아요').doc(doc.data()['name']).delete();

        // merge와 현재 type 레시피의 like를 1씩 뺌
        await dbService.collection('category').doc('category').collection(hookCatego).doc(userid).update({찜 : current_like - 1});


        alert('찜이 삭제 되었습니다!')
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


      await dbService.collection('user').doc(temp).collection('좋아요').doc(doc.data()['name']).set(data)

      // merge와 현재 type 레시피의 like를 1씩 뺌
      await dbService.collection('category').doc('category').collection(hookCatego).doc(userid).update({찜 : current_like + 1});

      alert('찜이 완료 되었습니다!')
      
      }

      });
   
}



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
                    type = 'text'
                    value={data ? data['name'] : null}
                    maxLength={10} /> 
                     <input 
               
                    type = 'text'
                    value={data ? data['price'] : null}
                
                    readOnly
                    maxLength={10} /> 
                         <button><Link to={"/buy/" + hookCatego + "/" + userid}>구매하기</Link></button>
                <button onClick={like}>찜해두기</button>
                </div>

                <div>{
                    <textarea 
           
                    className={regi.content_txt2} 
                    readOnly
                    value={data ? data['content'] : null}
                    minLength={100} />}
                </div> 
               <img src={data ? data['img1'] : null} width='600px' height ='500px'/>
                
               <h1 className={rec.detail}>상세사진</h1>
                <img src={data ? data['img2'] : null} className={rec.subimage} width='300px' height ='300px'/> 
                <img src={data ? data['img3'] : null} className={rec.subimage} width='300px' height ='300px'/> 
              <img src={data ? data['img4'] : null} className={rec.subimage} width='300px' height ='300px'/>
     

                
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