import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';


import { authService , dbService } from '../model/firebase';


import "./style/style.css";
import Header from "./Header"


let mystate;

const Buy = () => {
   
const [IsManager, setIsManager] = useState(false);
const [All_info, setAll_info] = useState([]);
const [My_info, setMy_info] = useState([]);

const [data, setdata] =useState([]);
const [myID,setmyID] = useState("");

const [check,setcheck] = useState(false);
const [userObj, setUserObj] = useState(null);

const [productid,setproductid] = useState("");
const [productcate,setproductcate]=useState("")


let Catego,id
let writer=""

  useEffect(() => {
      
    authService.onAuthStateChanged((user) => {
        if (user) {
      // url로 넘어온 본인 state를 얻음
      mystate = window.location.href.split("/")[4]
      mystate=decodeURI(mystate)
      setUserObj(user);

        
    const id=user.email.split('@')[0]; // 본인 id 판단
    setmyID(id)
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
      

    }

    });


    // url로 넘어온 본인 state를 얻음
    Catego = window.location.href.split("/")[4]
    Catego = decodeURI(Catego)
    setproductcate(Catego)
    id = window.location.href.split("/")[5]
    id=decodeURI(id)
    setproductid(id)

    console.log(Catego)
    console.log(id)

    //   사용자가 선택한 게시글에 맞게 데이터를 불러옴
    const docRef = dbService.collection('category').doc('category').collection(Catego).doc(id)

    docRef.get().then(function(doc) {  setdata(doc.data()) });

  

   // dbService.collection('category').doc('category').collection(Catego).doc(id).update({"구매목록" : My_info["구매목록"]})

        
  }, []);


  const buy_product = async () => {
    if(window.confirm('상품을 구매하시겠습니까?')){
        console.log(Catego)
        console.log(data['name'])
        console.log(data)
        
        My_info['구매목록'].push(data['name'])
        await dbService.collection('user').doc(myID).update({"구매목록" : My_info["구매목록"]})

        //   사용자가 선택 게시글에 맞게 데이터를 불러옴
        console.log(productid)
        const docRef = await dbService.collection('category').doc('category').collection(productcate).doc(productid)

    
        docRef.get().then( async function(doc) { 
          writer = doc.data()['writer']
          console.log(writer)


        const ref = dbService.collection("user").doc(writer)

        ref.get().then( async function(doc) { 
         

        let t_data = doc.data()['판매완료목록']
        t_data.push(data['name'])
        console.log(t_data)
        
        await dbService.collection('user').doc(writer).update({"판매완료목록" : t_data})
        const docRef = await dbService.collection('category').doc('category').collection(productcate).doc(productid).update({'soldout' : 'O'})


        });

      });

        alert("구매가 완료되었습니다!")

        setcheck(true)

    }
  }





    return(
      <div>
        <Header></Header>
        <div className="backwrap">
        <div className="mainform">

        <h2 align="center">결제 정보 확인</h2>
        <table width="463px" height="300px" border="1px">
          <tbody>
            <tr>
              <td width="100px"><h4>&nbsp;이름</h4></td><td>&nbsp;{My_info.name}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;아이디</h4></td><td>&nbsp;{My_info.id}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;이메일</h4></td><td>&nbsp;{My_info.email}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;주소</h4></td><td>&nbsp;{My_info.address}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;상품명</h4></td><td>&nbsp;{data['name']}</td>
            </tr>
            <tr>
              <td><h4>&nbsp;결제 금액</h4></td><td>&nbsp;{data['price']}</td>
            </tr>

          </tbody>
        </table>

        <br></br>
        <h1 onClick={buy_product} align="center"><Link to="/view_buy">구매하기</Link></h1>

        {All_info.map((Show)=>(
         
                <li><Link to={"/Userinfo"+"/"+Show.id}>{Show.id}</Link></li>
           
         ))}

       
          <div className="authBtns">
         
          </div>
     </div>
                 {/* 게시글이 작성되었나 판단해서 작성된 경우에는 redirect로 게시판 페이지로 이동 */}
                 <div>{check ? <Redirect from="/buy" to = "/Category" />: null}
                </div>
     </div>
     </div>
    );
    

 
    }

 export default Buy;