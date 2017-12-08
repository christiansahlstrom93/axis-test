import React from "react";

export default class SiteTemplate extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.storeSite = this.storeSite.bind(this);

		this.state = {sitename: ''};
	}

	componentDidMount() {
		const title = this.props.editMode ? this.props.site.title : '';
		this.setState({sitename: title});
	}

	onChange(ev) {
		this.setState({sitename: ev.target.value});
	}

	storeSite() {
		if (this.state.sitename == '') {
			return;
		}
		const user = this.props.user;
		const siteData = {'owner': user.username, 'title': this.state.sitename};
		
		if (this.props.editMode) {
			this.props.updateSite(this.props.site.id, siteData, user);
		} else {
			this.props.createSite(siteData, user);
		}
		
		this.props.toggleTemplate(false);
	}

	render() {
		const buttonText = this.props.editMode ? 'Update site' : 'Create site';

		const emptyNameError = this.state.sitename == '' ? 
			<div className="alert alert-danger">
              Name can not be empty
            </div>
            : '';

		return (
			<div className="site-template-container">
				<a className="w3-rest close-link" onClick={() => this.props.toggleTemplate(false) }>Close without saving</a>
				<input type="text" placeholder="Site name" value={this.state.sitename} onChange={this.onChange}/><br/>
				{emptyNameError}
				<button className="btn btn-success save-site-button" onClick={() => this.storeSite()}>{buttonText}</button>
			</div>
    	)
	}
}