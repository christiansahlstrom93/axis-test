function getDeviceSchema() {
	const device = {
			"device": {
			"site_id": "",
			"title": "",
			"description": "",
			"model": "",
			"version": "",
			"enabled": "",
			"connected": "",
			"timezone": "",
			"storages": []
		}
	}
	return device;
}


export default { getDeviceSchema };