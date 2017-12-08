import React from "react";
import DeviceBody from "./DeviceBody";

export default class DeviceList extends React.Component {

	constructor(props) {
		super(props);
		this.addStorage = this.addStorage.bind(this);
		this.onChange = this.onChange.bind(this);
		this.getStorages = this.getStorages.bind(this);
		this.storeDevice = this.storeDevice.bind(this);
		this.getInputs = this.getInputs.bind(this);

		this.state = {};
	}

	storeDevice(data) {
		if (data.site_id == '') {
			data.site_id = this.props.siteId;
		}
		
		if (data.id) {
			this.props.updateDevice(data);
		} else {
			this.props.createDevice(data);
		}
		data = {};
		this.props.closeTemplate();
	}

	onChange(data, prop, event) {
		data[prop] = event.target.value;
		this.forceUpdate();
	}

	getStorages(data) {
		const storageArr = [];
		if (data && data.storages) {
			data.storages.forEach((storage, index) => {
				storageArr.push(<input type="text" key={`{storage.id}${index}`} placeholder="Id" value={storage.id} onChange={(e) => this.onChange(storage, 'id', e)} />);
				storageArr.push(<input type="text" key={`state-${storage.id}${index}`} placeholder="State" value={storage.state} onChange={(e) => this.onChange(storage, 'state', e)}/>)
			});
		}
		return storageArr;
	}

	addStorage(data) {
		if (data) {
			data.storages.push( {'id': 'id', 'state': 'state'});
		}
		this.forceUpdate();
	}

	getInputs(data, skipEntries) {
		const inputs = [];
		for (let key in data) {
			if (skipEntries.indexOf(key) < 0) {
				inputs.push(<input type="text" placeholder={key} key={key} value={data[key]} onChange={(e) => this.onChange(data, key, e)}/>);
			}
		}
		return inputs;
	}

	render() {
		const data = this.props.deviceData ? this.props.deviceData.device : {};

		return (
			<div>
				<div className="w3-animate-opacity template-container thumbnail">
					<a className="w3-rest close-link" onClick={() => this.props.closeTemplate() }>Close without saving</a>
					{this.getInputs(data, ['id', 'site_id', 'storages'])}
					<h2>Storage</h2>
					{this.getStorages(data)}
					<div className="button-container">
						<button className="btn btn-default add-storage-button" onClick={() => this.addStorage(data)}>+ Add storage</button>
						<button className="btn btn-success save-device-button" onClick={() => this.storeDevice(data)}>+ Save device</button>
					</div>
				</div>
    		</div>
    	)
	}
}
