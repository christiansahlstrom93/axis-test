import React from "react";
import DeviceBody from "./DeviceBody";
import DeviceTemplate from "./DeviceTemplate";
import DeviceSchema from "../../../Schemas/Device.js";

export default class DeviceList extends React.Component {

	constructor(props) {
		super(props);
		this.addOrEditDevice = this.addOrEditDevice.bind(this);
		this.closeTemplate = this.closeTemplate.bind(this);

		this.state = {showTemplate : false};
	}

	closeTemplate() {
		this.setState({showTemplate : false});
	}

	addOrEditDevice(deviceData) {
		if (!deviceData) {
			deviceData = DeviceSchema.getDeviceSchema();
		}
		this.setState({showTemplate: true, deviceData: deviceData});
	}

	render() {
		const devices = this.props.devices ? this.props.devices.map((device) =>  <DeviceBody addOrEditDevice={this.addOrEditDevice} deleteDevice={this.props.deleteDevice} 
																					key={device.id} device={device} closeTemplate={this.closeTemplate}/>) : "";

		const deviceTemplate = this.state.showTemplate ? <DeviceTemplate updateDevice={this.props.updateDevice} createDevice={this.props.createDevice} deviceData={this.state.deviceData} closeTemplate={this.closeTemplate} siteId={this.props.siteId}  /> : '';

		return (
			<div className="w3-animate-opacity list-container">
				<div className="w3-row-padding">
	    			<div className="w3-center w3-padding-64">
	     	 			<span className="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">Devices</span>
	    			</div>
	    		{deviceTemplate}
	    		{devices}
   			 	</div>
   			 	<button className="btn btn-primary pull-right add-device-button" onClick={() => this.addOrEditDevice()}>Add device</button>
			</div>
    	)
	}
}