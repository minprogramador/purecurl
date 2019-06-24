'use strict';

const url 		    = require('url');
const querystring = require('querystring');
const https 	    = require('./lib/https.js');
const http  	    = require('./lib/http.js');
const json_decode = require('./lib/json_decode.js');
const isJson 	    = require('./lib/isJson.js');

var res = '';

const run = async (payload) => {
	if(typeof payload === 'undefined') {
		return false;
	}
	var dataEncoded = '';
	var dataPost;
	var resultok = '';
	let urlver = url.parse(payload.url);

	if(typeof payload.body !== 'undefined') {
		dataPost = payload.body;
	}else if(typeof payload.formData !== 'undefined') {
		dataPost = payload.formData;
	}else if(typeof payload.form !== 'undefined') {
		dataPost = payload.form;
	}else if(typeof payload.data !== 'undefined') {
		dataPost = payload.data;
	}

	if(typeof dataPost === 'object') {
		
		if(typeof payload.json === 'boolean') {
			dataPost = JSON.stringify(dataPost);
			payload.headers['Content-Type'] = 'application/json';
			payload.headers['Accept'] = 'application/json';
		}else{
			dataPost = querystring.stringify(dataPost, null, null,{ encodeURIComponent: encodeURIComponent });
			payload.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			payload.headers['Accept'] = "*/*";
		}
	}

	try {

		if(urlver.protocol === 'http:') {
			res = await http(payload, dataPost);
		}else if(urlver.protocol === 'https:') {
			res = await https(payload, dataPost);
		}

		if(isJson(res.body)) {
			resultok = json_decode(res.body);
		}else{
			resultok = res.body;
		}

		return {headers: res.headers, body: resultok, json: json_decode(res.body)};
	}catch(e) {
		return {msg: 'ops, caiu no catch', err: e};
	}
};

const get = async (url, headers='') => {

	let payload = {
		method: 'GET',
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/58.0"
		}
	};

	payload.url = url;

	if(headers !== '') {
		payload = Object.assign({}, payload, {headers: headers} );
	}
	return await run(payload);
};

const post = async (url, data='') => {
	let payload = {
		method: 'POST',
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/58.0"
		}
	};

	if(typeof data.form !== 'undefined') {
		data = data.form;
	}else if(typeof data.json !== 'undefined') {
		data = data.json;
		payload.json = true;
	}else if(typeof data.body !== 'undefined') {
		data = data.body;
	}else if(typeof data.formData !== 'undefined') {
		data = data.formData;
	}else if(typeof data.data !== 'undefined') {
		data = data.data;
	}else{
		return {err: true, msg: "payload post invalido."};
	}
	
	if(typeof url !== 'string') {
		payload = Object.assign({}, url, payload);
		payload.data = data;
	}else{
		payload.url = url;
		payload.data = data;
	}

	return await run(payload);
};

const curl = module.exports = run;
curl.get   = get;
curl.post  = post;






