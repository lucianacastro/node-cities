var paginateList = function(items, ipp, query) {
	var p = parseInt(query.p || 1);
	var final = p * ipp;
	console.log("final value: " + final);

	var initial = final - ipp;
	console.log("initial value: " + initial);
	return {
		_total: items.length,
		_p: p,
		_ipp: ipp,
		_next: getNextUrl(query),
		_prev: getPrevUrl(query),
		items: items.slice(initial, final)
	}
}

module.exports = { paginateList: paginateList };

var getPageUrl = function(query, pValue) {
	var baseUrl = 'http://localhost:3000/api/cities';
	var queryKeys = Object.keys(query);
	if (queryKeys.indexOf('p') < 0) {
		queryKeys.push('p');
	}
 	var queryString = queryKeys.map(function(key) {
 		return key + '=' + (key === 'p' ? pValue : query[key]);
 	}).join('&');

 	return baseUrl + '?' + queryString;
}

var getNextUrl = function(query) {
	var pValue =  parseInt(query.p || 1) + 1;
 	return getPageUrl(query, pValue);
}

var getPrevUrl = function(query) {
	var pValue =  parseInt(query.p || 1) - 1;
	// control de mínima
	if(pValue < 1) {
		return null;
	}
 	return getPageUrl(query, pValue);
}

