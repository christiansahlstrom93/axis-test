import React from "react";

export default class SorageInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const storageInfo = this.props.info;
		const informations = storageInfo.map((info) => <li key={info.id}>{`${info.id} - status: ${info.state}`}</li>);
		return (
			<div>
				<div className="w3-center storage-container">
					<span className="w3-medium w3-bottombar w3-border-dark-grey bottombar-thin">Storage</span>
				</div>
				<ul>
					{informations}
				</ul>
			</div>
    	)
	}
}