import ImagePicker from 'react-native-image-picker'
import ErrorNotif from './ErrorNotif'

var options = {
  title: 'Add or Change Image Background',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default function (cb) {
  ImagePicker.showImagePicker(options, (response) => {
    if (response.error) {
      ErrorNotif('008')
    } else if (response.uri) {
      var source = response.uri.replace('file://', '');
      let imageId = source.split('/').slice(-1)[0];
      var source = `~/Documents/images/${imageId}`
      cb(source)
    }
  });
}