import dispatcher from '../dispatcher';

export function createSchedule(text) {
    dispatcher.dispatch({
        type: "SCHEDULE_CREATE",
        text,
    });
}

export function deleteSchedule(id) {
    dispatcher.dispatch({
        type: "SCHEDULE_DELETE",
        id,
    });
}