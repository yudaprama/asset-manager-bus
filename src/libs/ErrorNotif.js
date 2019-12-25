import {Alert} from 'react-native';

export default (errId) => Alert.alert('Something went wrong', `Please try again. If error persist, please contact support and tell support that error id is ${errId}. With error id information, we can fix this error faster.`)