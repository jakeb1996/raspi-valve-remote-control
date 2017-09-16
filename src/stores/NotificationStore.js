import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class NotificationStore extends EventEmitter {	
    dispatcherHandler(action) {
        switch(action.type) {
            case 'NOTIFICATION_SEND': {
                // send notification
                this.emit('NOTIFICATION_SENT', action);
                break;
            }
            default: {
                break;
            }
        }
    }
}

const notificationStore = new NotificationStore();
dispatcher.register(notificationStore.dispatcherHandler.bind(notificationStore));

export default notificationStore;