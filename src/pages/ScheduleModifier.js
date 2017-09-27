import React, { Component } from 'react';
import './DeviceConnector.css';
import DeviceStore from '../stores/DeviceStore';
import SchedulePicker from '../components/SchedulePicker/SchedulePicker';

class DeviceConnector extends Component {
    componentWillMount() {
        DeviceStore.on('DEVICE_CREATED', () => {
            this.setState({
                devices: DeviceStore.getAll()
            });
        });
    }

    render() {
        return (
            <div>
                <SchedulePicker />
            </div>
        );
    }
}

export default DeviceConnector;