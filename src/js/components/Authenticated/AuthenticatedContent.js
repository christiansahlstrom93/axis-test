import React from "react";
import DeviceList from "./Device/DeviceList";

export default class AuthenticatedContent extends React.Component {

	constructor(props) {
		super(props);
		this.fetchDevicesForSite = this.fetchDevicesForSite.bind(this);

		this.state = {};
	}

	componentDidUpdate() {
		if (!this.state.siteId && this.props.sites && this.props.sites.length > 0) {
			this.fetchDevicesForSite(this.props.sites[0].id);
		}
	}

	fetchDevicesForSite(siteId) {
		this.setState({siteId});
		this.props.getDevices(siteId);
	}

	render() {
		const user = this.props.user[0];
		const siteLinks = this.props.sites ? this.props.sites.map((site) => 
						<a className={(this.state.siteId == site.id ? 'link-active w3-rest' : 'w3-rest')} key={site.id} onClick={() => this.fetchDevicesForSite(site.id) }>{site.title}</a>) : '';

		const devices = this.props.devices ? <DeviceList devices={this.props.devices}/> : '';

		return (
				<div className="w3-animate-opacity">
					<div className="welcome-text-container">
						<h1>{`Logged in as: ${user.username}`}</h1>
		      		</div>
			      	<div className="w3-row link-wrapper">
	                    {siteLinks}
	                </div>
	                {devices}
				</div>
    	)
	}
}