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
  // 각각 type에 맞게 데이터를 불러오기 위함
  const [dress, setdress] = useState([]);
  const [jumper, setjumper] = useState([]);
  const [pants, setpants] = useState([]);
  const [shirts, setshrits] = useState([]);
  const [skirt, setskirt] = useState([]);
  const [top, settop] = useState([]);


  const [dress_ranking, setdress_ranking] = useState([]);
  const [jumper_ranking, setjumper_ranking] = useState([]);
  const [pants_ranking, setpants_ranking] = useState([]);
  const [shirts_ranking, setshrits_ranking] = useState([]);
  const [skirt_ranking, setskirt_ranking] = useState([]);
  const [top_ranking, settop_ranking] = useState([]);

  const [chosen, setchosen] = useState([]);
  const [chosen_ranking, setchosen_ranking] = useState([]);


  const [total,settotal] = useState([]);
  

  const [category,setcategory] = useState("dress");

  const [Search_name,setSearch_name] = useState("");

  const [mainimage,setmainimage] = useState("https://user-images.githubusercontent.com/37290818/119679402-4a325700-be7b-11eb-915b-420f154d1b54.png");



  
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
  
    settotal([])
    setchosen([])

   
   dbService.collection("category").doc('category').collection('dress').orderBy("찜", "desc").onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setdress(boardArray)
    setdress_ranking(boardArray.slice(0,4))
    //setchosen(boardArray)
    
    setchosen((prev) => [...boardArray, ...prev])
    settotal((prev) => [...boardArray, ...prev])
  });


   dbService.collection("category").doc('category').collection('jumper').orderBy("찜", "desc").onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setjumper(boardArray)
    setjumper_ranking(boardArray.slice(0,4))

    setchosen((prev) => [...boardArray, ...prev])
    settotal((prev) => [...boardArray, ...prev])
  });


   dbService.collection("category").doc('category').collection('pants').orderBy("찜", "desc").onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setpants(boardArray)
    setpants_ranking(boardArray.slice(0,4))

    setchosen((prev) => [...boardArray, ...prev])
    settotal((prev) => [...boardArray, ...prev])
  });


   dbService.collection("category").doc('category').collection('shirts').orderBy("찜", "desc").onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setshrits(boardArray)
    setshrits_ranking(boardArray.slice(0,4))

    setchosen((prev) => [...boardArray, ...prev])
    settotal((prev) => [...boardArray, ...prev])
  });


   dbService.collection("category").doc('category').collection('skirt').orderBy("찜", "desc").onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setskirt(boardArray)
    setskirt_ranking(boardArray.slice(0,4))

    setchosen((prev) => [...boardArray, ...prev])
    settotal((prev) => [...boardArray, ...prev])
  });


   dbService.collection("category").doc('category').collection('top').orderBy("찜", "desc").onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    settop(boardArray)
    settop_ranking(boardArray.slice(0,4))

    setchosen((prev) => shuffle([...boardArray, ...prev]))
    settotal((prev) => shuffle([...boardArray, ...prev]))

  });


  }, []);

     // 객체 정보를 섞어주는 함수
     function shuffle(sourceArray) {
      for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));
  
        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
      }
  
      return sourceArray
    }
  
 
  // 사용자가 선택한 type에 맞게 데이터를 선택하는 함수
      const getChosen = async (event) => {

        // event안에 존재하는 target의 value를 name으로 넘긴다.
      const {
        target: {name},
      } = event;
      // 아래 name으로 판단해서 chosen 객체에 앎맞는 데이터를 주입
      if(name == "Dress"){

        setchosen(dress)
        setchosen_ranking(dress_ranking)
        setcategory("dress")
      
      } 
      else if(name == "jumper"){

        setchosen(jumper)
        setchosen_ranking(jumper_ranking)
        setcategory("jumper")
      }
      else if(name == "pants"){

        setchosen(pants)
        setchosen_ranking(pants_ranking)
        setcategory("pants")

        
      }
      else if(name == "shirts"){


        setchosen(shirts)
        setchosen_ranking(shirts_ranking)
        setcategory("shirts")
        
      }
      else if(name == "skirt"){

        setchosen(skirt)
        setchosen_ranking(skirt_ranking)
        setcategory("skirt")

        
      }
      else if(name == "top"){


        setchosen(top)
        setchosen_ranking(top_ranking)
        setcategory("top")
        
      } 
      else
      {
        setchosen_ranking(null)
        setchosen(total)
      }

}



  // 검색한 name을 set해줌
   const set_search_name = async (event) => {
    event.preventDefault();
    setchosen_ranking(null)
    const {
      target: { value },
    } = event;


    setSearch_name(value)

  };

  // 임시로 객체를 담는 temp와 스트링을 담는 변수 선언
  let stringVal=""
  let temp=[];
  let temp2=[];

  // 검색한 name으로 검색을해서 limit_board에 넣어줌
  const search_db = () => {

    total.map((name)=>(
     stringVal = name.name,
     // 찾는 name이 존재하면 값을 넣어줌
     stringVal.includes(Search_name) ? temp.push(name) : null
     ))
    

     console.log(temp)
    // 검색결과가 존재하는지 판단
    if(temp.length==0)
    {
      alert('검색결과가 존재하지 않습니다.')
    }
    else
    {
  
    setchosen(temp);
    }

    setSearch_name("")

  }
// 검색에서 Enter를 누르면 검색을 진행
  const isEnter = (e) => {
    if(e.key == "Enter")
    {
      search_db()
    }
  }


// 내가 현재 즐겨찾기 해놓은것을 알기 위한 함수
const Show_favorite = async(event) =>{

  const temp = authService.currentUser.email.split("@")[0]

  setchosen_ranking([])
  setchosen([]);
  // 해당 유저의 즐겨찾기 정보를 보두 가져온다.
  await dbService.collection("user").doc(temp).collection("좋아요").onSnapshot((snapshot) => {
    const favoriteArray = snapshot.docs.map((doc) => ({
      id : doc.id
    }));
    // 즐겨찾기 해놓은 모든 대해서 실행
     while(favoriteArray.length)
     {
      //  즐겨찾기 해놓은 이름을 기반으로 객체를 넣어주는 함수를 실행
       get_favorite(favoriteArray)
     }
  });



}

 //  즐겨찾기 해놓은 이름을 기반으로 객체를 넣어주는 함수
const get_favorite = async(favoriteArray) =>{
  // 즐겨찾기 해놓은  이름을 저장
  const id=favoriteArray.pop()
  total.map((name)=>(
    stringVal = name.name,
    // 찾는 name이 존재하면 값을 넣어줌
    stringVal==id.id ? temp2.push(name) : null
    ))


    setchosen( [...temp2])
    
}


    return(           
            <div className={rec.wrap}> 
               <div className={menu.LGbgr}> 
             <Header></Header>
             
             <img src={mainimage} className={rec.mainimage}/>
              <div className={rec.WHbgr}>
             
                <div className={rec.btnsection}>
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
            {chosen_ranking ? chosen_ranking.map((Show)=>(
                <div >
                  <h4 className={rec.hot} align='center'>HOT</h4>
                  <h1><Link to={"/View_product/" + Show.category + "/" +Show.id}>{Show.name}</Link></h1>
                  <Link to={"/View_product/" + Show.category + "/" +Show.id}><img
                    src={ Show.img1 }
                    width='300px'
                    height='300vh'
                 /></Link>
                  <h2>{Show.price}</h2>
                  <h3>{"품절 : "+Show.soldout}</h3>
                  <h3>{"찜 : "+Show.찜}</h3>
                  <div className={rec.line}>   </div>
                  </div>
              )) : null}
      
              {/* chosen객체에 존재하는 모든 document에 대해서 Show로 각각 지정해주고 , 그 값들을 나열해준다. key값은 위에서 넣어준 id값 */}
              {chosen ? chosen.map((Show)=>(
                <div >
                
                  <h1 align='center'><Link to={"/View_product/" + Show.category + "/" +Show.id}>{Show.name}</Link></h1>
                  <Link to={"/View_product/" + Show.category + "/" +Show.id}><img
                    src={ Show.img1 }
                    width='300px'
                    height='300vh'
                 /></Link>
                  <h2>{Show.price}원</h2>
                  <h3>{"품절 : "+Show.soldout}</h3>
                  <h3>{"찜 : "+Show.찜}</h3>
                  <div className={rec.line}>   </div>
                  </div>
              )) : null}
            </div>
            
             {/* 페이지 개수에 맞게 페이지 번호를 만들어주고 클릭시에 그 페이지에 맞는 게시글을 보여줌 */}
    <div className={rec.numnqna}>
                
                <div className={rec.qna}>
                  <input
                  onKeyPress = {isEnter} 
                  value={Search_name}
                  onChange={set_search_name}
                  type = 'text'
                  placeholder='검색'
                    /> 
                    <li onClick={search_db}> &nbsp; 검색</li>
                </div>
              </div>
              
            </div>

            
 

          </div>    
                
            </div>
            
          
    );
}         


 export default Category;
