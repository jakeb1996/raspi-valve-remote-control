import React, { Component } from 'react';
import './DeviceConnector.css';
import logo from '../logo.svg';
import DeviceStore from '../stores/DeviceStore';
import * as DeviceActions from '../actions/DeviceActions';
import * as NotificationActions from '../actions/NotificationActions';
import SchedulePicker from '../components/SchedulePicker/SchedulePicker';

class DeviceConnector extends Component {
    constructor(props) {
        super(props);

        this.readDeviceStore = this.readDeviceStore.bind(this);
        this.deviceIdUpdate = this.deviceIdUpdate.bind(this);

        this.state = {
            devices: [],
        }
    }

    componentWillMount() {
        DeviceStore.on('DEVICE_CREATED', () => {
            this.setState({
                devices: DeviceStore.getAll()
            });
        });

        DeviceStore.on('DEVICE_NO_MATCH', () => {
            console.log('device no match');
            NotificationActions.newNotification('test');
            /*this.props.notify.addNotification({
                message: 'Uh oh, there is no device for this ID!',
                level: 'warning'
            });*/
        });

        DeviceStore.on('DEVICE_ERROR', () => {
            console.log('device error');
            this.props.notify.addNotification({
                message: 'Hmm, the service could not be reached...',
                level: 'error'
            });
        });
    }

    componentDidMount() {
        this.setState({ schedules: DeviceStore.getAll() });
        //this.NotificationSystem = this.refs.notificationSystem;
    }

    deviceIdUpdate(e) {
        this.setState({ deviceWriteKey: e.target.value });
    }

    readDeviceStore() {
        DeviceActions.addDevice(
            this.state.deviceWriteKey
        );
    }

    render() {
        const scheduleComponents = this.state.devices.map((schedule, index) =>
            <div key={index}>{schedule.name}</div>
        );

        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/><br />
                <input
                    className="txtCreateDevice"
                    alt="Device ID"
                    onChange={this.deviceIdUpdate}
                    value={this.state.deviceWriteKey}
                />
                <button className="btnReadDevice"
                        alt="Read Device"
                        onClick={this.readDeviceStore}
                >
                    Read
                </button>

                <SchedulePicker />

                {scheduleComponents}

            </div>

        );
    }
}

export default DeviceConnector;