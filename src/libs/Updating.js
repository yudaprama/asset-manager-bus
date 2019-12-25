"use strict"

import {AsyncStorage} from 'react-native';

export default (compID,updatedItem,oldObject,change,key,cb) => {
	if (['UsefulLife','icon'].includes(key)) {
		AsyncStorage.getItem(compID, (err, result) => {
		  let old = JSON.parse(result);
		  let ini = old.filter((o) => o.Group === oldObject)
		  let lain = old.filter((o) => o.Group !== oldObject)
		  ini.forEach((o) => o[key] = updatedItem);
		  let newData = ini.concat(lain)
		  AsyncStorage.setItem(compID, JSON.stringify(newData))
		  cb(newData)
		})
	} else {
		var newObject = Object.assign({}, oldObject, updatedItem)
		newObject.Amount = newObject.Unit * newObject.MarketValue
		AsyncStorage.getItem(compID, (err, result) => {
			if (result) {
				let data = JSON.parse(result);
				var newData = data.filter((o) => o[key] !== newObject[key])
				if (change) var newData = newData.concat([newObject])
			} else {
				var newData = [newObject]
			};
			if (newData) {
				AsyncStorage.setItem(compID, JSON.stringify(newData))
				cb(newObject)
			};
		})
	};
}

