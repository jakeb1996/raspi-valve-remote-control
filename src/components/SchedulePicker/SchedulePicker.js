import React, {Component} from 'react';

class SchedulePicker extends Component {
    constructor(props) {
        super(props);

        this.saveSchedule = this.saveSchedule.bind(this);
        this.validate = this.validate.bind(this);

        this.frmTimeStart = this.frmTimeStart.bind(this);
        this.frmRunTime = this.frmRunTime.bind(this);
        this.frmDaysOfWeek = this.frmDaysOfWeek.bind(this);
        this.frmMonths = this.frmMonths.bind(this);

        this.state = {
            timeStart: '',
            runTime: 0,
            daysOfWeek: [],
            months: []
        };
    }

    validate() {
        return false;
    }

    saveSchedule() {
        console.log(this.state);
    }

    frmTimeStart(e) {
        this.setState({ timeStart: e.target.value });
    }

    frmRunTime(e) {
        this.setState({ runTime: e.target.value });
    }

    frmDaysOfWeek(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ daysOfWeek: value });
    }

    frmMonths(e) {
        this.setState({ months: e.target.value });
    }

    render() {
        var title = "Create Schedule";

        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <div className="row">
                            <h4>{title}</h4>
                        </div>

                        <div className="row">
                            <label for="timeStart">Start time</label>
                            <input
                                id="timeStart"
                                type="time"
                                onChange={this.frmTimeStart}
                                value={this.state.frmTimeStart}
                            />
                        </div>
                        <div className="row">
                            <label for="runTime">Run time (minutes)</label>
                            <input
                                id="runTime"
                                type="number"
                                onChange={this.frmRunTime}
                                value={this.state.frmRunTime}
                            />
                        </div>
                        <div className="row">
                            <label>Day of week</label>
                            <select multiple className="browser-default"
                                ref="daysOfWeek"
                                onChange={this.frmDaysOfWeek}
                                value={this.state.frmDaysOfWeek}
                            >
                                <option value="" disabled>Choose your option</option>
                                <option value="0">Sunday</option>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                            </select>
                        </div>
                        <div className="row">
                            <label>Month</label>
                            <select multiple className="browser-default"
                                id="months"
                                onChange={this.frmMonths}
                                value={this.state.frmMonths}
                            >
                                <option value="" disabled>Choose your option</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                        <div className="row">
                            <a className="waves-effect waves-light btn col s12" onClick={this.saveSchedule}>
                                <i className="material-icons right">cloud_upload</i>Save Schedule
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SchedulePicker;