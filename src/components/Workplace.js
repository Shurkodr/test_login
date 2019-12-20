import React, { Component } from 'react';
import Table from "./Table";

class Workplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginServer: 'qwerty',
      passServer: '123456',
      passedLogin: false,
      loginUser: '',
      passwordUser: '',
      errorValidation: false,
    };
    this.loginChange = this.loginChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  loginChange(action) {
    const loginStrChanged = action.target.value;
    this.setState({ loginUser: loginStrChanged, errorValidation: false });
  }

  passwordChange(action) {
    const passwordStrChanged = action.target.value;
    this.setState({ passwordUser: passwordStrChanged, errorValidation: false });
  }

  submitLogin(action) {
    action.preventDefault();
    let { loginServer , passServer, passedLogin, loginUser,passwordUser, errorValidation} = this.state;
    if (loginServer === loginUser && passServer === passwordUser) {
      this.setState({ passedLogin: true });
    } else {
      this.setState({ errorValidation: true });
    }
  }
  render() {
    let { passedLogin, errorValidation } = this.state;
    const errorLabel
      = <span style={{ "color": "red"}}>Error validation</span>;
    const showError = errorValidation ? errorLabel : "";

    if (passedLogin) {

      return(
        <Table />
      );
    } else {
      return (
        <form onSubmit={this.submitLogin}>
          <label htmlFor="login-input">
            <input onChange={this.loginChange} id="login-input" type="text" placeholder="Login" />
          </label>
          <label htmlFor="password-input">
            <input onChange={this.passwordChange} id="password-input" type="password" placeholder="password"/>
          </label>
          {
            showError
          }
          <button onSubmit={this.submitLogin} type="submit">Login</button>
        </form>
      );
    }
  }

}

export default Workplace;
