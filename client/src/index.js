import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

let intial={users:[]}
let loginreducer=(final=intial,reqopting)=>{
   if(reqopting.type==="datasend"){
    return {...final,data:[reqopting.data]}
   }else if(reqopting.type==="cleardata"){
    return {...final,data:[]}
   }
    return final
   
}
const initialState = {
   lists:[],
   selectedBook:[]
};
let bookreducer=(final=initialState,reqopt)=>{
  console.log(reqopt)
   if(reqopt.type==="Readingspace"){
    return {...final,lists:reqopt.data}
   }else if(reqopt.type==="selectedbook"){
    return {...final,selectedBook:reqopt.book}
   }
   console.log(final)
    return final
   
}
let reducer=combineReducers({
  login:loginreducer,
  books:bookreducer
  
})
let store=createStore(reducer)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> <App /></Provider>
    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
