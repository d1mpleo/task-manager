import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header'



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "state 1",
      userData: "",
      password: ""
    }

    this.inputClick = this.inputClick.bind(this)
    this.loginClick = this.loginClick.bind(this)

    this.lgnRef = React.createRef();
    this.pswRef = React.createRef();
  }

  render() {
    return (<div>
  <Header  description="description"/>
    <h1>{this.state.text}</h1>
    <h2>{this.state.userData}</h2>
    <h2>{this.state.password}</h2>
    <h1></h1>
    <input placeholder="логін" onClick={this.inputClick} ref={this.lgnRef}/>
    <input placeholder="пароль" ref={this.pswRef} onChange={event => this.setState({password: event.target.value})}/>
    <button onClick={this.loginClick}>Ввійти</button>
  </div>)
}
  inputClick() {
    const st = this.state.text === "state 1" ? "state 2" : "state 1";
    this.setState({text: st})

    console.log("clicked")
  }

  loginClick() {
    const login = this.lgnRef.current.value;
    const password = this.pswRef.current.value;
    const data = login+" "+password;
    this.setState({userData: data})
  }
}

export default App;