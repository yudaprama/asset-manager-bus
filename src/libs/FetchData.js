import {
	AsyncStorage
} from 'react-native';
import PrettyDate from './PrettyDate'
import ErrorNotif from './ErrorNotif'
import LocalData from '../../data/Assets.json'

function getData(storageName, callback) {
	AsyncStorage.getItem(storageName, (err, result) => {
		if (err) ErrorNotif('001')
		let data = JSON.parse(result);
		callback(null, data);
	})
}

function fetching(storageName, callback) {
	var data = LocalData[storageName]
	data.forEach((doc, index) => {
	  doc.id = index
	  doc.Amount = doc.Unit * doc.MarketValue
	});
	var colors = ['#FF5E3A', '#34AADC', '#FF9500', 'rgb(244,119,130)', 'rgb(255,150,128)', '#4CD964', 'rgb(205,97,106)', '#52EDC7'];
	for (var i = 0, j = 0; i < data.length; i++, j++) {
	  data[i].c = colors[j];
	  if (j == colors.length - 1) {
	    j = -1;
	  }
	}

  AsyncStorage.setItem(storageName, JSON.stringify(data));
  AsyncStorage.setItem(`${storageName}_STOREDATE`, JSON.stringify(PrettyDate()));
  callback(null, data);
}

export default function (storageName, callback) {
	if (storageName === '1') {
		AsyncStorage.getItem(`${storageName}_STOREDATE`, (err, result) => {
		  if (result) {
		    let previousStoreDate = JSON.parse(result)
		    let currentDate = PrettyDate()
		    
		    if (previousStoreDate !== currentDate) {
		      fetching(storageName, callback)
		    } else {
		      getData(storageName, callback)
		    }
		  } else {
		    fetching(storageName, callback)
		  };

		  if (err) fetching(storageName, callback)
		});
	} else if (storageName === 'Company') {
		AsyncStorage.getItem(storageName, (err, result) => {
			if (err) ErrorNotif('002')
			if (result) {
				let data = JSON.parse(result);
				callback(null, data);
			} else {
				let data = LocalData[storageName]
				AsyncStorage.setItem(storageName, JSON.stringify(data));
				callback(null, data);
			};
		})
	} else {
		AsyncStorage.getItem(storageName, (err, result) => {
			if (err) ErrorNotif('003')
			if (result) {
				let data = JSON.parse(result);
				callback(null, data);
			} else {
				let data = []
				AsyncStorage.setItem(storageName, JSON.stringify(data));
				callback(null, data);
			};
		})
	};
}