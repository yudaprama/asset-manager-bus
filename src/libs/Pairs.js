var omit = require('lodash/omit');

export default function (data, anotherArray) {
	var anotherArray = anotherArray === undefined ? [] : anotherArray
	let pasti = ['c','icon','fontSize','id','img','cText','Amount','UsefulLife','DepreciationMethod']
	let union = [...new Set([...pasti, ...anotherArray])]
	let beforePairs = omit(data, union)
	var arrPairs = []
	let toPairs = Object.keys(beforePairs).forEach((key) => arrPairs.push([key, beforePairs[key]]))
	return arrPairs
}