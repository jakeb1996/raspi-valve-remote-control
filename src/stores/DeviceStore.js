import { EventEmitter } from "events";
import axios from 'axios';
import dispatcher from '../dispatcher';
import API from '../config';

class DeviceStore extends EventEmitter {
    constructor() {
        super();
        this.devices = [];

        this.addDevice = this.addDevice.bind(this);
    }

    getAll() {
        return this.devices;
    }

    addDevice(id) {
        this.emit('NOTIFICATION_SEND');
        axios.get(API.baseUrl + id)
            .then(function(response) {
                dispatcher.dispatch({
					type: "NOTIFICATION_SEND",
					level: "success",
					message: 'Connecting...'
				});
            })
            .catch(function(error) {
                if (error.response) {
                    if (error.response.status === 400) {
						dispatcher.dispatch({
							type: "NOTIFICATION_SEND",
							level: "warning",
							message: 'Hmm, this device could not be found!'
						});
                    }
                } else  {
                    dispatcher.dispatch({
							type: "NOTIFICATION_SEND",
							level: "warning",
							message: 'Uh oh, the service could not be reached...'
						});
                }
            });

        this.devices.push({
            key: id,
            id: id
        });
    }

    dispatcherHandler(action) {
        switch(action.type) {
            case 'DEVICE_ADD': {
                this.addDevice(action.id);
                break;
            }
            default: {
                break;
            }
        }
    }
}

const deviceStore = new DeviceStore();
dispatcher.register(deviceStore.dispatcherHandler.bind(deviceStore));

export default deviceStore;