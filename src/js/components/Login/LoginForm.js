import React from "react";

export default class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.usernameOnChange = this.usernameOnChange.bind(this);
		this.passwordOnChange = this.passwordOnChange.bind(this);

		this.state = {username : '', password: ''};
	}

	usernameOnChange(ev) {
		this.setState({username: ev.target.value});
	}

	passwordOnChange(ev) {
		this.setState({password: ev.target.value});
	}

	render() {
		const loginFailed = this.props.loginFailed ? 
			<div className="alert alert-danger">
              Inloggning misslyckades, var god försök igen.
            </div>
            : '';

		return (
			<div>
				<div className="welcome-text-container">
					<h1>Welcome</h1>
				</div>
  				<div className="container">
	    			<label><b>Username</b></label>
	    			<input className="login-input" onChange={this.usernameOnChange} type="text" placeholder="Enter Username" />
	    			<label><b>Password</b></label>
	    			<input className="login-input" onChange={this.passwordOnChange} type="password" placeholder="Enter Password" />
	    			<button className="login-button" onClick={() => this.props.authenticate(this.state.username, this.state.password)}>Login</button>
	    			{loginFailed}
  				</div>
			</div>
    	)
	}
}