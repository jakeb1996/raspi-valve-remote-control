import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ScheduleStore extends EventEmitter {
    constructor() {
        super();
        this.schedules = [
            { key: 123, name: "test1" },
            { key: 456, name: "test2" },
            { key: 789, name: "test3" }
        ];

        this.createSchedule = this.createSchedule.bind(this);
    }

    getAll() {
        return this.schedules;
    }

    createSchedule(text) {
        this.schedules.push({
            key: Date.now(),
            name: Date.now()
        });
        this.emit("SCHEDULE_CREATED");
    }

    dispatcherHandler(action) {
        switch(action.type) {
            case "SCHEDULE_CREATE": {
                this.createSchedule(action.text);
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