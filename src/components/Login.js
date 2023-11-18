import React, { Component } from 'react'


export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      userName: "",
      password:""
    };
    
  }

  
  render() {
    const handleLogin = () => {
      if (
        this.state.userName &&
        this.state.password &&
        this.state.password === this.state.userName
      ) {
        localStorage.setItem("userName", JSON.stringify(this.state.userName));

        alert("Logged in successfully!");
        window.location.replace("/orders");
      } else {
        alert("Please enter valid credential");
      }
    };
    return (
      <div>
        <div id="login" className="LoginForm">
          <h1>Sign In</h1>
          <input
            className="InputField"
            id="username"
            type="text"
            name="username"
            placeholder="Enter Username"
            onBlur={(e) => {
              this.setState({
                userName: e.target.value,
                password: this.state.password,
              });
            }}
          />
          <input
            className="InputField"
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
            onBlur={(e) => {
              this.setState({
                password: e.target.value,
                userName: this.state.userName,
              });
            }}
          />
          <input
            className="Button"
            type="submit"
            defaultValue="Login"
            onClick={handleLogin}
          />
        </div>
      </div>
    );
  }
}
