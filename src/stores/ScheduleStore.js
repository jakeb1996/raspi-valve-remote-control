import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import API from '../config';

class ScheduleStore extends EventEmitter {
    constructor() {
        super();
        this.schedules = [
            {
                "schedules": [
                    {
                        "minute": 0,
                        "hour": 2,
                        "day": "*",
                        "month": "*",
                        "year": "1,3,5",
                        "runTime": 120
                    },
                    {
                        "minute": 0,
                        "hour": 22,
                        "day": "*",
                        "month": "*",
                        "year": "1,3,5",
                        "runTime": 30
                    }
                ]
            }
        ];

        this.createSchedule = this.createSchedule.bind(this);
    }

    getAll() {
        return this.schedules;
    }

    retrieveSchedule(deviceId) {
        axios.get(API.baseUrl + deviceId)
            .then(function(response) {
                dispatcher.dispatch({
                    type: "NOTIFICATION_SEND",
                    level: "success",
                    message: 'Retrieved schedule!'
                });

                console.log(response);
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
    }


    createSchedule(text) {
        this.schedules.push({
            key: Date.now(),
            name: Date.now()
        });
        this.emit("SCHEDULE_CREATED");
    }

    dispatcherHandler(action) {
        console.log(action.type);
        switch(action.type) {
            case "SCHEDULE_CREATE": {
                this.createSchedule(action.text);
                break;
            }
            case "SCHEDULE_RETRIEVE": {
                this.retrieveSchedule(action.deviceId);
                break;
            }
            default: {
                break;
            }
        }
    }
}

const scheduleStore = new ScheduleStore();
dispatcher.register(scheduleStore.dispatcherHandler.bind(scheduleStore));

export default scheduleStore;