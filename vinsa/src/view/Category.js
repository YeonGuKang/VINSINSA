import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, useHistory } from 'react-router-dom';

import rec from "./style/Recipesp.module.css";
import menu from "./style/MenuBar.module.css";

import Header from "./Header"
import { authService , dbService } from '../model/firebase';




// 페이지 잘라서 보여줄 갯수
const init_btnlimit=10;
// 몇개의 페이지가 존재할지 확인하는 변수
let btnlimit=init_btnlimit;
// next버튼이 클릭됐는지 확인하는 변수
let check=0;

// 마지막 페이지인지 확인
let last_page=false;

const Category = () => {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [IsManager, setIsManger] = useState(false);
   
  // 파이어베이스에서 데이터를 가져오는 과정
  // 각각 채식 type에 맞게 데이터를 불러오기 위함
  const [dress, setdress] = useState([]);
  const [jumper, setjumper] = useState([]);
  const [pants, setpants] = useState([]);
  const [shirts, setshrits] = useState([]);
  const [skirt, setskirt] = useState([]);
  const [top, settop] = useState([]);

  const [chosen, setchosen] = useState([]);

  const [category,setcategory] = useState("dress");



  
  useEffect(() => {
    last_page=false;
    // 스크롤 상단으로 초기화
    window.scrollTo(0, 0);
    console.log(userObj)
    console.log(authService.currentUser)
    authService.onAuthStateChanged((user) => {

      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);

      } else {
        setIsLoggedIn(false);
        setIsManger(false);
      }
      setInit(true);
       
    });
  
    

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("category").doc('category').collection('dress').onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setdress(boardArray)
    setchosen(boardArray)
  });

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("category").doc('category').collection('jumper').onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setjumper(boardArray)
  });

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("category").doc('category').collection('pants').onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setpants(boardArray)
  });

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("category").doc('category').collection('shirts').onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setshrits(boardArray)
  });

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("category").doc('category').collection('skirt').onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setskirt(boardArray)
  });

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("category").doc('category').collection('top').onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    settop(boardArray)
  });


  }, []);

 
  // 사용자가 선택한 type에 맞게 데이터를 선택하는 함수
      const getChosen = async (event) => {

        // event안에 존재하는 target의 value를 name으로 넘긴다.
      const {
        target: {name},
      } = event;
      // 아래 name으로 판단해서 chosen 객체에 앎맞는 데이터를 주입
      if(name == "Dress"){

        setchosen(dress)
        setcategory("dress")
      
      } 
      else if(name == "jumper"){

        setchosen(jumper)
        setcategory("jumper")
      }
      else if(name == "pants"){

        setchosen(pants)
        setcategory("pants")

        
      }
      else if(name == "shirts"){


        setchosen(shirts)
        setcategory("shirts")
        
      }
      else if(name == "skirt"){

        setchosen(skirt)
        setcategory("skirt")

        
      }
      else if(name == "top"){


        setchosen(top)
        setcategory("top")
        
      } 

}



//   // 검색한 name을 set해줌
//    const set_search_name = (event) => {
//     const {
//       target: { value },
//     } = event;


//     setSearch_name(value)
 
//   };

//   // 임시로 객체를 담는 temp와 스트링을 담는 변수 선언
//   let stringVal=""
//   let temp=[];

//   // 검색한 name으로 검색을해서 limit_board에 넣어줌
//   const search_db = () => {


//     // 현재 chosen 을 판단해서 해당 type에서 검색
//     if( chosen == Vegan)
//     {
//         Vegan.map((name)=>(
//         stringVal = name.id,
//         // 찾는 name이 존재하면 값을 넣어줌
//         stringVal.includes(Search_name) ? temp.push(name) : null
//         ))
//     }
//     else if(chosen == Lacto)
//     {
//        Lacto.map((name)=>(
//         stringVal = name.id,
//         stringVal.includes(Search_name) ? temp.push(name) : null
//         ))
//     }
//     else if(chosen == Ovo)
//     {
//        Ovo.map((name)=>(
//         stringVal = name.id,
//         stringVal.includes(Search_name) ? temp.push(name) : null
//         ))
//     }
//     else if(chosen == LactoOvo)
//     {
//        LactoOvo.map((name)=>(
//         stringVal = name.id,
//         stringVal.includes(Search_name) ? temp.push(name) : null
//         ))
//     }
//     else if(chosen == Pollo)
//     {
//        Pollo.map((name)=>(
//         stringVal = name.id,
//         stringVal.includes(Search_name) ? temp.push(name) : null
//         ))
//     }
//     else if(chosen == Pesco)
//     {
//         Pesco.map((name)=>(
//         stringVal = name.id,
//         stringVal.includes(Search_name) ? temp.push(name) : null
//         ))
//     }
//     else if(chosen == PolloPesco)
//     {
//        PolloPesco.map((name)=>(
//         stringVal = name.id,
//         stringVal.includes(Search_name) ? temp.push(name) : null
//         ))
//     }
//     // 모두 아닌경우 모든 레시피를 가지고있는 Flexi에서 검색
//     else{
//     Flexi.map((name)=>(
//      stringVal = name.id,
//      // 찾는 name이 존재하면 값을 넣어줌
//      stringVal.includes(Search_name) ? temp.push(name) : null
//      ))
//     }

//     // 검색결과가 존재하는지 판단
//     if(isEmptyObject(temp))
//     {
//       alert('검색결과가 존재하지 않습니다.')
//     }
//     else
//     {
//       btnlimit=init_btnlimit;
//       check=0;
//       last_page=false;
//       // 이전에 넣어둔 데이터를 밀어줌
//       setlimit_boards([])

//     // 넣은 값들을 chosen과 limit_boards에 set 페이지도 1로 다시 set
//     setchosen(temp);
//     setpage(1);
//     setlimit_boards(temp.slice(0,limit))
//     }
  
//     setSearch_name("")
 
//   }
// // 검색에서 Enter를 누르면 검색을 진행
//   const isEnter = (e) => {
//     if(e.key == "Enter")
//     {
//       search_db()
//     }
//   }


  // // 내가 현재 즐겨찾기 해놓은것을 알기 위한 함수
  // const Show_favorite = async(event) =>{
  //   // 
  //   btnlimit=init_btnlimit;
  //   check=0;
  //   last_page=false;
    
  //   setstep(Merge); // 즐찾을 누르면 비건 단계가 풀림(merge로 설정)

  //   vege_imageRef.current.src = vegex;
  //   egg_imageRef.current.src = eggx;
  //   milk_imageRef.current.src = milkx;
  //   fish_imageRef.current.src = fishx;
  //   chicken_imageRef.current.src = chickenx;
  //   meat_imageRef.current.src =  meatx;

  //   if (!bookmarkCheck){
  //   typeoff();
  //   checkoutHash();
  //   BookmarkRef.current.src = bookmarko;
      
  //   setbookmarkCheck(true);
  //   setfavorite_list([]);
  //   setlimit_boards([]);
  //   setchosen([]);
  //   // 해당 유저의 즐겨찾기 정보를 보두 가져온다.
  //   await dbService.collection("유저정보").doc(userObj.uid).collection("즐겨찾기").onSnapshot((snapshot) => {
  //     const favoriteArray = snapshot.docs.map((doc) => ({
  //       ...doc.data()
  //     }));
  //     // 즐겨찾기 해놓은 모든 레시피에 대해서 실행
  //      while(favoriteArray.length)
  //      {
  //       //  즐겨찾기 해놓은 이름을 기반으로 객체를 넣어주는 함수를 실행
  //        get_favorite(favoriteArray)
  //      }
  //   });


  //   setpage(1);
   
  // }
  // else {
  //   setbookmarkCheck(false);
  //   BookmarkRef.current.src = bookmarkx;
  //   setchosen(Merge);
  //   setlimit_boards(Merge.slice(0, limit));
  // }
  // }

  //  //  즐겨찾기 해놓은 이름을 기반으로 객체를 넣어주는 함수
  // const get_favorite = async(favoriteArray) =>{
  //   // 즐겨찾기 해놓은 레시피 이름을 저장
  //   const id=favoriteArray.pop()['favorite']
  //   // 그 레시피 이름을 기반으로 데이터를 merge에서 불러옴
  //   const res = await dbService.collection('merge').doc(id).get();
  //   var favorite_data = res.data()

  //   // id를 이렇게 따로 넣어줘야 함
  //   favorite_data.id=id;
   
  // // 불러온 레시피의 정보를 모두 set해줌
  //   setfavorite_list((prev) => [favorite_data, ...prev]);
  //   setchosen((prev) => [favorite_data, ...prev]);
  //   setlimit_boards((prev) => [favorite_data, ...prev].slice(0,limit))
  // }


    return(           
            <div className={rec.wrap}> 
               <div className={menu.LGbgr}> 
             <Header></Header>
              <div className={rec.WHbgr}>
                <div className={rec.btnsection}>
                  <button onClick={getChosen} name="Dress">Dress</button>
                  <button onClick={getChosen} name="jumper">jumper</button>
                  <button onClick={getChosen} name="pants">pants</button>
                  <button onClick={getChosen} name="shirts">shirts</button>
                  <button onClick={getChosen} name="skirt">skirt</button>
                  <button onClick={getChosen} name="top">top</button>
              <div className={rec.ingredientbtn}>
                                                                            
              </div>

              <div className={rec.vegetarianbtn}>
                                            
                 </div>  

            <div className={rec.hashtagbtn}>
                                                                                                                                                                                                      
            </div>

              </div>
              </div>
              </div>

              <div>
              <div className={menu.space}></div>
          {/* 버튼을 클릭했을때 name의 값을 getChosen으로 넘겨줌 */}
          <div className={menu.DGbgr}>
            {/* 사용자가 클릭한 type에 맞는 객체 정보를 쭉 나열해서 보여줌 */}
            <div className={rec.sectionplace}>
              {/* chosen객체에 존재하는 모든 document에 대해서 Show로 각각 지정해주고 , 그 값들을 나열해준다. key값은 위에서 넣어준 id값 */}
              {chosen.map((Show)=>(
                <div >
                
                  <h1><Link to={"/View_product/" + category + "/" +Show.id}>{Show.name}</Link></h1>
                  <img
                    src={ Show.img1 }
                    width='300px'
                    height='300vh'
                 />
                  <h2>{Show.price}</h2>
                  <h3>{"품절 : "+Show.soldout}</h3>
                  <h3>{"좋아요 : "+Show.찜}</h3>
            
                  </div>
              ))}
            </div>
            
             {/* 페이지 개수에 맞게 페이지 번호를 만들어주고 클릭시에 그 페이지에 맞는 게시글을 보여줌 */}
    <div className={rec.numnqna}>
                
                <div className={rec.qna}>
                    {/* <input
                    onKeyPress = {isEnter} 
                    value={Search_name}
                    onChange={set_search_name}
                    type = 'text'
                    placeholder='음식 검색'
                     /> */}
                     {/* <li onClick={search_db}> &nbsp; 검색</li> */}
                </div>
              </div>
              
            </div>

            
 

          </div>    
                
            </div>
            
          
    );
}         


 export default Category;
