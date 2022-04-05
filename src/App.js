// import "./App.css";
// import styled from "styled-components";
// //import {Form} from "./components/login";
// import { List } from "./components/accountBox/table";
// import { BrowserRouter,Routes,
//   Route,
//   NavLink} from "react-router-dom";
// import { View } from "./components/accountBox/table";
// import { Update } from "./components/accountBox/update";
// import { Navigation } from "./components/signup";
// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// function App() {
//   return(
//     <BrowserRouter>
//     <NavLink>
//       <Routes>
//       {/* <Route exact path="/tables" element={<View/>} /> */}
//       {/* <Route exact path="tables/update/:username" element={<Update />}/> */}
//       <Route exact path="/" element={Form}   
//       />
//     </Routes>
//     </NavLink>
//   </BrowserRouter>
//   ) 
  
// }

// export default App;
import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import SignInOutContainer from './containers';
import { View } from "./components/table";
import {Project} from "./components/project";
import {Task} from "./components/task";
import {Bug} from "./components/bug";

function App() {
  return (
    // <div className="App">
    //  <SignInOutContainer/>
    // </div>
    <BrowserRouter>
    <Routes>    
      <Route exact path="/" element={<SignInOutContainer/>}/>
      <Route exact path="/components/table" element={<View/>}/>
      <Route exact path="/components/project" element={<Project/>} />     
      <Route exact path="/components/task" element={<Task/>} />     
      <Route exact path="/components/bug" element={<Bug/>} />          
    </Routes>
    </BrowserRouter>
  );
}

export default App;