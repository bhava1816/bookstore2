import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

function Navigation() {
  let dispacth=useDispatch()
  let navigate=useNavigate()
   let objectdata=useSelector((store)=>{
      return store.login.data
  })
    useEffect(()=>{
    if(objectdata && objectdata.length>0){

    }
    else{
      navigate("/")
    }
    },[objectdata])
   let myfunction=async()=>{
    let mybody=new FormData()
    mybody.append("email",objectdata[0].email)
    let response=await fetch("http://localhost:1111/delete",{method:"DELETE",body:mybody})
    let jsodata=await response.json()
   
    console.log(jsodata)
  }
  
  return (
    <div className="navbar" >
      <Link to="/dashbroad">dashbroad</Link>
      <Link to="/contact">contact</Link>
      <Link to="/help">help</Link>
      <Link to="/edit">editprofile</Link>
      <Link to="/" onClick={()=>{
        dispacth({type:"cleardata"})
      }}>signout</Link>
      <Link to="/" onClick={()=>{
        myfunction()
      }}>DeleteAccount</Link>
      
    </div>
  )
}

export default Navigation
