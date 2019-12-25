"use strict";

export default function(data,cb) {
	var input = data
	input.forEach((o)=> {
	  o.Amount = o.Unit * o.MarketValue
	  delete o.Item
	  delete o.Unit
	  delete o.MarketValue
	});

	let reduceData = input.reduce((res, obj) => {
	  if (!(obj.Group in res))
	    res.__array.push(res[obj.Group] = obj);
	  else {
	    res[obj.Group].Amount += obj.Amount;
	    res[obj.Group].SalvageValue += obj.SalvageValue;
	  }
	  return res;
	}, {__array:[]}).__array.sort((a,b) =>  b.Amount - a.Amount)

	cb(reduceData)
}