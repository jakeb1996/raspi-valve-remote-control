import dispatcher from '../dispatcher';

export function newNotification(test) {
    dispatcher.dispatch({
        type: 'SEND_NOTIFICATION',
        id: test,
    });
}