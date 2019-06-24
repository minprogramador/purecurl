
### # PureCurl.js.
Exemplos:


### // Verbo GET - enviando headers.
```javascript
const curl = require('purecurl');

let dados = await curl.get('https://httpbin.org/headers');
	//console.log(dados.json);
	//console.log(dados.body);
	//console.log(dados.headers);

//ou...
```
	 
	 


```javascript
let payload = {
	url: 'https://httpbin.org/get',
	method: 'GET',
	headers: {
		"User-Agent": "anonymous",
		"Cookie": "cookie=true"
	}
};

let dados = await curl(payload);

//ou, com headers..
let url = 'https://httpbin.org/headers';
let headers = {
	"User-Agent": "anonymous"
};

let dados = await curl.get(url, headers);
console.log(dados.json);
```

	 
	 


### // Verbo POST - Envia string/data
```javascript
let payload = {
	url: 'https://httpbin.org/post',
	method: 'POST',
	data: "usuario=demo&senha=demo",
	headers: {}
};

let dados = await curl(payload);

//ou...

let dados = await curl.post('https://httpbin.org/post', {data: {usuario: "demo", "senha": "demo"}});
```

	 
	 


### // Verbo POST - Envia um objeto como Form.
```javascript
let payload = {
	url: 'https://httpbin.org/post',
	method: 'POST',
	data: {
		usuario: "demo",
		senha: "demo"
	},
	headers: {}
};

let dados = await curl(payload);

//ou
let dados = await curl.post('https://httpbin.org/post', {form: {usuario: "demo", "senha": "demo"}});
```


	 
	 


### // Verbo POST - Envia json
```javascript
let payload = {
	url: 'https://httpbin.org/post',
	method: 'POST',
	data: {
		usuario: "demo",
		senha: "demo"
	},
	json: true,
	headers: {}
};

let dados = await curl(payload);

//ou
let dados = await curl.post('https://httpbin.org/post', {json: {usuario: "demo", "senha": "demo"}});
```

	 



### // Set proxy http e httpTohttps
```javascript
let payload  = {
	url: 'https://httpbin.org/get',
	method: 'GET',
	proxy: "http://192.168.0.100:3128"
	headers: {
		"User-Agent": "curl.js"
	}
};
let dados = await curl(payload);
console.log(dados.json);
```
