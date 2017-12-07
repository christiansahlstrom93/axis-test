import React from "react";
import DeviceBody from "./DeviceBody";

export default class DeviceList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const devices = this.props.devices ? this.props.devices.map((device) =>  <DeviceBody key={device.id} device={device} />) : "";
		return (
			<div className="w3-animate-opacity">
				<div className="w3-row-padding">
	    			<div className="w3-center w3-padding-64">
	     	 			<span className="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">Devices</span>
	    			</div>
	    		{devices}
   			 	</div>
			</div>
    	)
	}
}