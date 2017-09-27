import React, { Component } from 'react';
import './DeviceConnector.css';
import logo from '../logo.svg';
import DeviceStore from '../stores/DeviceStore';
import * as DeviceActions from '../actions/DeviceActions';
import * as NotificationActions from '../actions/NotificationActions';

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
            NotificationActions.newNotification('test');
        });

        DeviceStore.on('DEVICE_ERROR', () => {
            this.props.notify.addNotification({
                message: 'Hmm, the service could not be reached...',
                level: 'error'
            });
        });
    }

    componentDidMount() {
        this.setState({ schedules: DeviceStore.getAll() });
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
        return (
            <div>

                <div className="logo">
                    <img src={logo} className="App-logo" alt="logo"/><br />
                </div>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    placeholder="Device Identifier"
                                    id="txtDeviceId"
                                    type="text"
                                    className="validate"
                                    onChange={this.deviceIdUpdate}
                                    value={this.state.deviceWriteKey}
                                />
                                <label for="txtDeviceId">Device Identifier</label>
                            </div>
                        </div>
                        <div className="row">
                            <a className="waves-effect waves-light btn col s12" onClick={this.readDeviceStore}>
                                <i className="material-icons right">fingerprint</i>Connect
                            </a>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default DeviceConnector;