// import React, { useState } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

function BookStore() {
  let objdata=useSelector((store)=>{
       return store.books.lists
  })
  console.log(objdata)
  
    //  let [data,setdata]=useState([])
    let dispatch=useDispatch();
    let myfunction=async ()=>{
      let response=await fetch("http://localhost:1111/bookstore",{method:"GET"})
      let jsodata=await response.json()
      console.log(jsodata.data)
      dispatch({type:"Readingspace",data:jsodata.data})
      
      //  setdata(jsodata.data)
    }
    
  return (
    <div className="bookstore-container">
      <h1>bookstoreapi</h1>
      <button type='button' onClick={()=>{
        myfunction()
      }}>books</button>
      <div className='books'>
        {Array.isArray(objdata) && objdata.map((ele, i) => (
  <div key={i} className='mybook'>
    
    <h5>Authorname:{ele.Authorname}</h5>
    <h5>bookName:{ele.bookName}</h5>
    <h5>price:{ele.rate}$</h5>
    {/* <h5>{ele.parName}</h5> */}
    <Link to="/reading"><button type='button' onClick={()=>{
     dispatch({type:"selectedbook",book: ele})
    }}>clickme!</button></Link>
    
  </div>
))}
      </div>
      
    </div>
  )
}

export default BookStore
