import React from "react";
import StorageInfo from "./Storage/StorageInfo";

export default class DeviceList extends React.Component {

	constructor(props) {
		super(props);
        this.getStatusClass = this.getStatusClass.bind(this);
	    this.deleteDevice = this.deleteDevice.bind(this);
    }

    deleteDevice(device) {
        this.props.deleteDevice(device); 
        this.props.closeTemplate();
    }

  getStatusClass(status) {
    return this.checkStatus(status) ? 'enabled-text' : 'disabled-text';
  }

  checkStatus(status) {
    return  status == true || status == 'true';
  }

  render() {
        const device = this.props.device;
        const enabledText = this.checkStatus(device.enabled) ? 'Enabled' : 'Disabled';
        const connectedText = this.checkStatus(device.connected) ? 'Connected' : 'Not connected';
        const storageInformation = device.storages && device.storages.length > 0 ? <StorageInfo info={device.storages} /> : '';
    	return (
    		<div className="w3-third w3-margin-bottom">
                 <div className="w3-card-4 device-container">
                   <button className="btn btn-default pull-right" onClick={() => this.props.addOrEditDevice({device})}>Edit</button>
                   <button className="btn btn-danger pull-right remove-button" onClick={() => this.deleteDevice(device)} >Remove</button>
                   <div className="w3-container">
                       <h3>{device.title}</h3>
                       <p className="w3-opacity">{device.description}</p>
                       <hr/>
                       <p>{`Model: ${device.model}`}</p>
                       <p>{`Version: ${device.version}`}</p>
                       <p>{`Model: ${device.model}`}</p>
                       <p className={this.getStatusClass(device.enabled)}>{enabledText}</p>
                       <p className={this.getStatusClass(device.connected)}>{connectedText}</p>
                       <p>{`Timezone: ${device.timezone}`}</p>
                       <hr />
                       {storageInformation}
                   </div>
                 </div>
             </div>
        )
	 }
}