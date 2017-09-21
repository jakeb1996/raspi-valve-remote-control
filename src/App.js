import React, {Component} from 'react';
//import './App.css';
//import DeviceConnector from './pages/DeviceConnector';
import 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import NotificationStore from './stores/NotificationStore';
import Routes from './routes';

class App extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            // API details
            apiBaseUrl: 'https://mossbyte.com/api/v1/',
            appId: 'a28061dc-3a9a-4549-9d6b-0b5354e0af99',

            // Device details
            deviceConnected: false,
            deviceWriteKey: '9ef708ed-b216-4071-86e9-4950b3cc8962',
        };
    }*/

    /*componentDidMount() {
        this.NotificationSystem = this.refs.notificationSystem;
    }*/

    componentWillMount() {
        NotificationStore.on('NOTIFICATION_SENT', (notification) => {
            //console.log(notification.type);
            this.refs.notificationSystem.addNotification(notification);
        });
    }

    render() {
        return (
            <div className="App">
                <Routes />
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }

    /*render() {
        return (
            <div className="App">
                <DeviceConnector
                    deviceWriteKey={this.deviceWriteKey}
                />
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
            </div>
        );
    }*/
}

export default App;