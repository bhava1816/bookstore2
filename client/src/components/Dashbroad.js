import React from 'react'
import Navigation from './Navigation'
import { useSelector } from 'react-redux'
import BookStore from './BookStore'
function Dashbroad() {
  let objectdata=useSelector((store)=>{
      return store.login.data
  })
  console.log(objectdata)
  

   
  return (
    <div className="dashboard">
      <Navigation></Navigation>
      
      {Array.isArray(objectdata) && objectdata.length > 0 ? (
  objectdata.map((ele, i) => (
    <div key={i} className="user-section">
      <h3>{ele.firstName}</h3>
      <h3>{ele.lastName}</h3>
      <h3>{ele.email}</h3>
      <img src={`/uploads/${ele.profilepic}`} alt=''  width="100px" height="100px" style={{borderRadius:"100px"}}/>
    </div>
    
  ))
) : (
  <h2>No data found</h2>
)}
<BookStore></BookStore> 
    </div>
  )
}

export default Dashbroad
