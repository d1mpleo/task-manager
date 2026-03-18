// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import './main.css';

// import Header from './components/Header'
// import Task from './components/task'



// class App extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     text: "state 1",
  //     tip: "Enter login and password",
  //     userData: "",
  //     password: ""
  //   }

  //   this.inputClick = this.inputClick.bind(this)
  //   this.loginClick = this.loginClick.bind(this)

  //   this.lgnRef = React.createRef();
  //   this.pswRef = React.createRef();
  // }

// componentDidUpdate(prevProps, prevState) {
//   if (
//     prevState.password !== this.state.password ||
//     prevState.userData !== this.state.userData
//   ) {
//     if (this.state.password === "" && this.state.userData === "") {
//       this.setState({ tip: "Enter login and password" });
//     } else {
//       this.setState({ tip: "" });
//     }
//   }
// }
// src/App.js
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Task from "./components/Task";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <div>
      <Header description="Task list" />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </div>
  );
}