import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

function Readingspace() {
  let objdata=useSelector((store)=>{
       return store.books.selectedBook
  })
  console.log(objdata)
  useEffect(()=>{
    let starttime=Date.now()
    return ()=>{
      let endtime=Date.now();
      let time=Math.floor((endtime-starttime)/1000)
      alert(`congratulation you are complete this book by ${time}sec`)
      
    }
  },[])
  // let onclick=()=>{
  //    let endtime=Date.now();
  //     let time=Math.floor((endtime-starttime)/1000)
  //     alert(`congratulation you are complete this book by ${time}`)
  // }
  return (
    <div className="reading-container">

  <h1 className="reading-title">{objdata.bookName}</h1>

  <p className="reading-content">{objdata.parName}</p>

  <Link to="/dashbroad">
    <button type="button" className="done-btn">Done</button>
  </Link>
  
</div>
  )
}

export default Readingspace
