import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Picker extends Component {
    constructor(props) {
        super(props);

        this.deviceWriteKey = null;

        this.deviceIdUpdate = this.deviceIdUpdate.bind(this);
    }

    deviceIdUpdate(e) {
        this.setState({ deviceWriteKey: e.target.value });
    }

    render() {
        const { onChange } = this.props

        return (
            <div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            placeholder="Device Identifier"
                            id="txtDeviceId"
                            type="text"
                            className="validate"
                            onChange={this.deviceIdUpdate}
                        />
                        <label htmlFor="txtDeviceId">Device Identifier</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <a className="waves-effect waves-light btn col s12" onClick={e => onChange(this.state.deviceWriteKey)}>
                            <i className="material-icons right">fingerprint</i>Connect
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

Picker.propTypes = {
    onChange: PropTypes.func.isRequired
}