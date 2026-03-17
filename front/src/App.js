import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Button from './components/Button';
import Header from './components/Header'



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "state 1",
      tip: "Enter login and password",
      userData: "",
      password: ""
    }

    this.inputClick = this.inputClick.bind(this)
    this.loginClick = this.loginClick.bind(this)

    this.lgnRef = React.createRef();
    this.pswRef = React.createRef();
  }

componentDidUpdate(prevProps, prevState) {
  if (
    prevState.password !== this.state.password ||
    prevState.userData !== this.state.userData
  ) {
    if (this.state.password === "" && this.state.userData === "") {
      this.setState({ tip: "Enter login and password" });
    } else {
      this.setState({ tip: "" });
    }
  }
}


  render() {
    return (<div>
  <Header  description="description"/>
    <h1>{this.state.text}</h1>
    <h2>{this.state.userData}</h2>
    <h2>{this.state.password}</h2>
    <h1>{this.state.tip}</h1>
    <input placeholder="логін" onClick={this.inputClick} ref={this.lgnRef}/>
    <input placeholder="пароль" ref={this.pswRef} onChange={event => this.setState({password: event.target.value})}/>
    <Button />
    <Button text="logi"/>
    {/* <button onClick={this.loginClick}>Ввійти</button> */}
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