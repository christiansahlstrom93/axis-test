import React from "react";

export default class Header extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header-container">
				<a href="/"><img className="axis-icon" src="/resources/icon.png" /></a>
	      	</div>
    	)
	}
}