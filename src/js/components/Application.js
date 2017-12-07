import React from "react";
import Header from "./Header/Header";
import LoginForm from "./Login/LoginForm";
import AuthenticatedContent from "./Authenticated/AuthenticatedContent";
import AjaxRequest from '../services/AjaxHandler';

const API = 'http://localhost:3000/';

export default class Application extends React.Component {

	constructor(props) {
		super(props);
		this.authenticateUser = this.authenticateUser.bind(this);
		this.getSitesForUser = this.getSitesForUser.bind(this);
		this.getDevicesForSite = this.getDevicesForSite.bind(this);
		
		this.state = {authenticated: false, loginFailed: false};
	}

	authenticateUser(username, password) {
		AjaxRequest.get(API + 'users/?username=' + username + '&password=' + password, (authenticatedUser) => { 
			if (authenticatedUser.length > 0) {
				this.setState({authenticatedUser, authenticated: true});
				this.getSitesForUser(authenticatedUser[0]);
			} else {
				this.setState({loginFailed: true});
			}
		});
	}

	getSitesForUser(user) {
		AjaxRequest.get(API + 'sites?owner=' + user.username, (sites) => {
			this.setState({sites});
		});
	}

	getDevicesForSite(siteId) {
		AjaxRequest.get(API + 'devices?site_id=' + siteId, (devices) => {
			this.setState({devices: devices, siteId});
		});
	}

	render() {

		const content = this.state.authenticated ? 
			<AuthenticatedContent user={this.state.authenticatedUser} sites={this.state.sites} devices={this.state.devices} getDevices={this.getDevicesForSite} /> 
			: 
			<LoginForm authenticate={this.authenticateUser} loginFailed={this.state.loginFailed} />;

		return (
			<div>
				<Header />
				<div className="content-container w3-animate-opacity">
					{content}
				</div>
			</div>
    	)
	}
}