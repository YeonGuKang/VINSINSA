import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import rec from "./style/Recipe.module.css";
import noti from "./style/Notice.module.css";
import menu from "./style/MenuBar.module.css";

import { authService , dbService } from '../model/firebase';


import Header from "./Header"

const init_btnlimit=10;
let btnlimit=init_btnlimit;
let check=0;

const Seller_board = () => {

  //  DB에 존재하는 게시글을 받아오기 위함
  const [board, setboard] = useState("");
  const [boards, setboards] = useState([]);
  const [limit_boards,setlimit_boards]=useState([]);


  // 현재 자신이 존재하는 페이지를 알기 위함
  const [page,setpage] = useState(1);
  
  // 보여줄 갯수만큼 잘라서 이동을해주는 temp 객체
  let page_boards=[];

  // limit은 보여줄 개수
  let limit=10;
  let start=0;
  let end=limit;

  // 총 페이지가 몇개 나오는지 담는 배열
  let page_arr=[];

  // 페이지 개수를 알기위한 for문
  for(let i = 1; i <= Math.ceil(boards.length / limit); i++) {
    page_arr.push(i);
  }

  // 매니저 판단을 위해서 상수와 uid추가
  const [IsManager, setIsManger] = useState(false);
  const Manager = ['swe0dmffFQcoqpEUJ7fHtXYimEJ3','WFS2QtP4kEN3IWscNXtD1Ciso1t2','8s8IU2fnLPe5q0nIUheiZkwpMOk2','7a2QhDJ4gjbysYsQoFP5QbAIYhz2']
  
  useEffect(() => {
    // 스크롤 상단으로 초기화
    window.scrollTo(0, 0);

    authService.onAuthStateChanged((user) => {

      //  매니저를 판단
      if(user)
      {
        if(Manager.includes(user.uid))
        {
          setIsManger(true);
        }
        else{
          setIsManger(false);
        }
      }
    });

    // DB에서 게시글을 받아오는 과정
    dbService.collection("board").doc('seller_board').collection("seller_board").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        const boardArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(boardArray)
        setboards(boardArray);
      });
    
  }, []);

  // 현재 페이지를 보고 그 페이지에 맞게 게시글을 보여주는 함수
  const getpage = async (event) => {
    // event안에 존재하는 target의 value를 name으로 넘긴다.
  const {
    target: {name},
  } = event;

  // 현재 페이지를 받고
 setpage(Number(name));

//  그 페이지에 맞게 보여줄 게시글을 계산한다
  start=(name-1) * limit;
  end=start+limit;
  
  //  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
 page_boards=boards.slice(start,end)


//  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
 setlimit_boards(page_boards)

}


const prev_page = async() =>{


  // 맨 앞으로 왔을 경우에 prev실행 X
  if(check==0)
  {
    return
  }

  // 버튼을 보여주는 limit이 초기에 설정한 값보다 크면 실행
  if(btnlimit-init_btnlimit > init_btnlimit){
    btnlimit-=init_btnlimit;

    setpage((page-init_btnlimit+1))
  
  }
  // 그게 아니라면
  else
  {
    let i=1;
    
    while(btnlimit!=1)
    {
      console.log("btm",btnlimit)
      btnlimit-=i
    }
    btnlimit+=init_btnlimit

    // 맨 앞으로 왔을경우
    check=0;
    setpage(1)
  }

 
   //  그 페이지에 맞게 보여줄 게시글을 계산한다


start=((page-init_btnlimit+1)-1) * limit;
end=start+limit;


//  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
page_boards=boards.slice(start,end)


//  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
setlimit_boards(page_boards)

}



const change_page_arr = async() => {

  // limit 만큼 증가
  if(btnlimit+init_btnlimit <= page_arr.length){
    btnlimit+=init_btnlimit;
    setpage((page+init_btnlimit))
      // Next가 실행됐는지 check
      check+=1;
  }
  else
  {
    let i=1;
    let k=1;
    // 버튼이 init 보단 작지만 뒤에 몇개가 더 생성되는지 판단
    while(btnlimit != page_arr.length && page_arr.length > 10)
    {
      btnlimit+=i
      k++
    }
  
    // page가 더이상 마지막을 넘어가지 않도록 설정
    if((page+k)<=btnlimit && k!=1)
    {
    setpage((page+k))
    }

    console.log("k",k)
  }

   //  그 페이지에 맞게 보여줄 게시글을 계산한다
if(check!=0)  // check가 0이면 페이지가 init 미만이므로 실행 X
 {
start=((page+init_btnlimit)-1) * limit;
end=start+limit;


//  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
page_boards=boards.slice(start,end)


//  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
setlimit_boards(page_boards)

 } 


}



    return(           
        <div className={rec.wrap}> 
           <div className={menu.LGbgr}>     
            <Header></Header>
          </div>

        {/* 게시글을 보여주기 위한 middle 부분 */}
          <div className = {noti.middle}>
            <div className={noti.board}>
              <div className={noti.middlewh}>
                <div  className={noti.board_detail}>

                  {/* 제목 부분에 title을 불러옴 */}


                    {/* 마찬가지로 날짜 부분에 만든 날짜를 게시글 작성 날짜를 불러옴 */}
                    <div className={noti.board_date}>
                        <div className={noti.titlendate} align='center'>제목</div>
                        <hr size='2' color='lightgray'></hr>                   
                        
                        {boards.map(board => 
                        <div className={noti.board_content} key={board.id}>
                         <li align='center'><Link to ={"/View_board/" + board.id}>{board.name}</Link></li>
                         <hr size='2' color='lightgray'></hr>
                        </div>
                       )}
                    </div>

                     {/* 제목 부분에 title을 불러옴 */}
                    <div>
                      <div className={noti.titlendate} align='center'>작성자</div>
                      <hr size='2' color='lightgray'></hr>     
                        {boards.map(board => 
                        <div key={board.id} >
                            <li align='center'>{board.writer}</li>
                            <hr size='2' color='lightgray'></hr>                   
                        </div>
                        )}            
                    </div>

                    <div>
                      <div className={noti.titlendate} align='center'>날짜</div>
                      <hr size='2' color='lightgray'></hr>
                        {boards.map(board =>
                        <div key={board.id} >
                            <li align='center'>{board.createdAt}</li>
                            <hr size='2' color='lightgray'></hr>
                        </div>
                        )}
                    </div>

                      {/* 제목 부분에 title을 불러옴 */}
                      <div>
                      <div className={noti.titlendate} align='center'>통과여부</div>
                      <hr size='2' color='lightgray'></hr>     
                        {boards.map(board => 
                        <div key={board.id} >
                            <li align='center'>{board.admit}</li>
                            <hr size='2' color='lightgray'></hr>                   
                        </div>
                        )}            
                    </div>

                   

                </div>

                {/* 페이징을 위한 부분 */}
                    <div className={noti.paging_div}>
         
         {/* 페이지 개수에 맞게 페이지 번호를 만들어주고 클릭시에 그 페이지에 맞는 게시글을 보여줌 */}

                            
             <div className={noti.paging_section}>
            
               <li className={noti.page_num} onClick={prev_page}> &#60; PREV </li>

                {check==0 ?  page_arr.map( (el,key) =>  
                    el < btnlimit + 1 ?  <button key={key} className={noti.page_num} onClick={getpage} name={el} > {el} </button>
                  : null ) 
                  : page_arr.map( (el,key) =>  
                el+btnlimit-init_btnlimit < btnlimit + 2 ?  <button key={key} className={noti.page_num} onClick={getpage} name={el+btnlimit-init_btnlimit-1} >
                {el+btnlimit-init_btnlimit-1} </button>         
                  :  null ) }

               <li className={noti.page_num} onClick={change_page_arr}> NEXT &#62; </li>
                  
             </div>
             </div>
             <div className={noti.register}>{IsManager ? <li><Link to="/Register">옷 등록하기</Link></li> :  <li><Link to="/Register">옷 등록하기</Link></li>}</div>    
            </div>             
          </div>
          
      </div>         
          <div className={rec.half_bg} />  
        </div>
        
        
);
}


export default Seller_board;