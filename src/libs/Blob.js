"use strict";

export default function (data,cb) {
	var dataBlob = {}
	var sectionIDs = []
	var rowIDs = []

	data.forEach((doc) => dataBlob[doc.Group + ':' + doc.id] = doc);

	data.forEach((doc) => sectionIDs.push(doc.Group));

	sectionIDs = [...new Set(sectionIDs)]

	sectionIDs.forEach((doc) => {
	  let filter = data.filter(o => o.Group === doc)
	  let map = filter.map(o => o.id)
	  rowIDs.push(map)
	});
	
	cb(dataBlob,sectionIDs,rowIDs)
}