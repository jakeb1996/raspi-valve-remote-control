import dispatcher from '../dispatcher';

export function addDevice(id) {
    dispatcher.dispatch({
        type: "DEVICE_ADD",
        id: id,
    });
}