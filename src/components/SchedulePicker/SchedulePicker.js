import React, {Component} from 'react';

class SchedulePicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    <label for="timeStart">Start time: </label>
                    <input id="timeStart" type="time" className="form-control" />
                </div>
                <div class="form-group">
                    <label for="numLength">Run time: </label>
                    <input id="numLength" type="number" className="form-control" />
                </div>
                <div class="form-group">
                    <label for="daysWeek">Day of week: </label>
                    <select multiple id="daysWeek" className="form-control">
                        <option>Sunday</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="months">Month: </label>
                    <select multiple id="months" className="form-control">
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default SchedulePicker;