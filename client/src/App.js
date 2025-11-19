import logo from './logo.svg';
import './App.css';
import  {BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login'
import Dashbroad from './components/Dashbroad'
import Contact from './components/Contact'
import Help from './components/Help'
import Edit from './components/Edit';
import Readingspace from './components/Readingspace';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login></Login>}></Route>
     <Route  path='/signup' element={<Signup></Signup>}></Route>
     <Route  path='/dashbroad' element={<Dashbroad></Dashbroad>}></Route>
     <Route  path='/contact' element={<Contact></Contact>}></Route>
     <Route  path='/help' element={<Help></Help>}></Route>
     <Route  path='/edit' element={<Edit></Edit>}></Route>
     <Route path='/reading' element={<Readingspace></Readingspace>}></Route>
     
     </Routes>
     </BrowserRouter>
   
    </div>
  );
}

export default App;
