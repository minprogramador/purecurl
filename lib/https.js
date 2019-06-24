'use strict';

const https  = require('https');
const url 	 = require('url');
const tunnel = require('./tunnel');

var tunnelingAgent;

module.exports = ((urlOptions, data='') => {

	if(typeof urlOptions === 'object') {
		if(typeof urlOptions.url === 'string') {
			let urlparser = url.parse(urlOptions.url);
			urlOptions = Object.assign({}, urlparser, urlOptions);
		}
	}

	if(typeof urlOptions.proxy === 'string') {

		if(urlOptions.proxy.includes(':')) {
			let prparser = url.parse(urlOptions.proxy);
			let poolSize = 5;

			tunnelingAgent = tunnel.httpOverHttp({
			  proxy: {
			    host: prparser.hostname,
			    port: prparser.port
			  }
			});
		}

	}

	if(typeof tunnelingAgent === "object") {
		urlOptions.agent = tunnelingAgent;
	}

	return new Promise((resolve, reject) => {
		const req = https.request(urlOptions,
		(res) => {
			var body = '';
			res.on('data', (chunk) => (body += chunk.toString()));
			res.on('error', reject);
			res.on('end', () => {
				if(res.statusCode >= 200 && res.statusCode <= 299) {
					resolve({statusCode: res.statusCode, headers: res.headers, body: body});
				}
			})
		});

		req.on('error', reject);
		req.write(data, 'binary');
		req.end();
	});
});