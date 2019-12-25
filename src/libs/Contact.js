import {
	Alert
} from 'react-native';
var Mailer = require('NativeModules').RNMail;

export default ()=> {
	Mailer.mail({
	  subject: 'Need Support for App Manager for iPhone',
	  recipients: ['yudhaprama@icloud.com'],
	  body: ''
	}, (error, event) => {
	    if(error) {
	      Alert.alert('Error', 'Could not send mail. Please send a mail to yudhaprama@icloud.com');
	    }
	});
}