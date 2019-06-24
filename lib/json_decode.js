'use strict';

module.exports = (json, pretty=false) => {
	var res = '';
	if(typeof json === 'string') {
		res = JSON.parse(json);
	}else if(typeof json === 'object') {
		res = json;
	}else{
		res = {};
	}

	if(pretty === true) {
		res = JSON.stringify(res ,null, 2);
	}

	return res;
};