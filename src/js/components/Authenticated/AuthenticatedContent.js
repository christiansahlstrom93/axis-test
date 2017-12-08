import React from "react";
import DeviceList from "./Device/DeviceList";
import SiteTemplate from "./Site/SiteTemplate";

export default class AuthenticatedContent extends React.Component {

	constructor(props) {
		super(props);
		this.fetchDevicesForSite = this.fetchDevicesForSite.bind(this);
		this.toggleSiteTemplate = this.toggleSiteTemplate.bind(this);
		this.deleteSite = this.deleteSite.bind(this);

		this.state = {};
	}

	componentDidUpdate() {
		if (!this.state.site && this.props.sites && this.props.sites.length > 0) {
			this.fetchDevicesForSite(this.props.sites[0]);
		}
	}

	fetchDevicesForSite(site) {
		this.setState({site});
		this.props.getDevices(site.id);
		this.toggleSiteTemplate(false);
	}

	toggleSiteTemplate(showSiteTemplate, editMode) {
		if (!this.state.site) {
			editMode = false;
		}
		this.setState({showSiteTemplate, editMode});
	}

	deleteSite(user) {
		if (this.state.site) {
			this.props.deleteSite(this.state.site.id, user);
			this.toggleSiteTemplate(false);
		}
	}

	render() {
		const user = this.props.user[0];
		const siteLinks = this.props.sites && this.state.site ? this.props.sites.map((site) => 
						<a className={(this.state.site.id == site.id ? 'link-active w3-rest' : 'w3-rest')} key={site.id} onClick={() => this.fetchDevicesForSite(site) }>{site.title}</a>) : '';

		const devices = this.props.devices ? <DeviceList deleteDevice={this.props.deleteDevice} updateDevice={this.props.updateDevice} createDevice={this.props.createDevice} devices={this.props.devices} siteId={this.state.site.id}/> : '';
		const siteTemplate = this.state.showSiteTemplate ? <SiteTemplate user={user} toggleTemplate={this.toggleSiteTemplate} createSite={this.props.createSite} 
																updateSite={this.props.updateSite} editMode={this.state.editMode} site={this.state.site} /> : '';

		return (
				<div className="w3-animate-opacity">
					<div className="welcome-text-container">
						<h1>{`Logged in as: ${user.username}`}</h1>
		      		</div>
		      		{siteTemplate}
		      		<div className="w3-row link-wrapper thumbnail add-edit-link-container">
		      			<a className="w3-rest add-site-link" onClick={() => { this.toggleSiteTemplate(true) }}>+ Add site</a>
			      		<a className="w3-rest edit-site-link" onClick={() => { this.toggleSiteTemplate(true, true) }}>Edit site</a>
			      		<a className="w3-rest delete-site-link" onClick={() => { this.deleteSite(user) }}>Delete site</a>
		      		</div>
			      	<div className="w3-row link-wrapper">
	                    {siteLinks}
	                </div>
	                {devices}
				</div>
    	)
	}
}