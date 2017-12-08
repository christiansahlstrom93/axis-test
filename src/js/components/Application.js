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
		this.createDevice = this.createDevice.bind(this);
		this.updateDevice = this.updateDevice.bind(this);
		this.deleteDevice = this.deleteDevice.bind(this);
		this.createSite = this.createSite.bind(this);
		this.updateSite = this.updateSite.bind(this);
		this.deleteSite = this.deleteSite.bind(this);

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

	getSitesForUser(user, rerender) {
		AjaxRequest.get(API + 'sites?owner=' + user.username, (sites) => {
			this.setState({sites});
		});
	}

	getDevicesForSite(siteId) {
		AjaxRequest.get(API + 'devices?site_id=' + siteId, (devices) => {
			this.setState({devices: devices, siteId});
		});
	}

	createDevice(data) {
		AjaxRequest.post(API + 'devices', data, () => {
			this.getDevicesForSite(data.site_id);
		});
	}

	updateDevice(data) {
		AjaxRequest.put(API + 'devices/' + data.id, data,  () => {
			this.getDevicesForSite(data.site_id);
		});
	}

	deleteDevice(device) {
		AjaxRequest.delete(API + 'devices/' + device.id,  () => {
			this.getDevicesForSite(device.site_id);
		});
	}

	createSite(data, user) {
		AjaxRequest.post(API + 'sites', data, () => {
			this.getSitesForUser(user);
		});
	}

	updateSite(id, data, user) {
		AjaxRequest.put(API + 'sites/' + id, data,  () => {
			this.getSitesForUser(user);
		});
	}

	deleteSite(id, user) {
		AjaxRequest.get(API + 'devices?site_id=' + id, (devices) => {
			if (devices) {
				devices.forEach((device) => { 
					AjaxRequest.delete(API + 'devices/' + device.id);
				});
			}
		});

		AjaxRequest.delete(API + 'sites/' + id,  () => {
			this.setState({devices: ''});
			this.getSitesForUser(user);
		});
	}

	render() {
		const content = this.state.authenticated ? 
			<AuthenticatedContent user={this.state.authenticatedUser} sites={this.state.sites} devices={this.state.devices} getDevices={this.getDevicesForSite} updateDevice={this.updateDevice} 
								  createDevice={this.createDevice} deleteDevice={this.deleteDevice} createSite={this.createSite} updateSite={this.updateSite} deleteSite={this.deleteSite}/> 
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