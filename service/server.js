const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get('/personas', (request, response) => {
	fs.readFile('personas.json', (err, data) => {
	    if (err) response.send(JSON.parse('{"status": "500", "error": ' + err + '}'));

	    const json = JSON.parse('{"status": "200", "data": ' + data + '}');
	    response.send(json);
	});
});

app.get('/personas/:id', (request, response) => {
	fs.readFile('personas.json', (err, data) => {
	    if (err) response.send(JSON.parse('{"status": "500", "error": ' + err + '}'));

	    let personas = JSON.parse(data);

		const result = personas.find(item => item.id == request.params.id);

		if(!result) response.send(JSON.parse('{"status": "404"}'));

	    const json = JSON.parse('{"status": "200", "data": ' + JSON.stringify(result) + '}');
	    response.send(json);
	});
});

app.post('/personas', (request, response) => {
	fs.readFile('personas.json', (err, data) => {
	    if (err) response.send(JSON.parse('{"status": "500", "error": ' + err + '}'));

	    let personas = JSON.parse(data);

		request.body.id = personas[parseInt(personas.length - 1)].id + 1;

		const new_personas = [...personas, request.body];

        fs.writeFileSync('personas.json', JSON.stringify(new_personas));
		response.send(JSON.parse('{"status": "200"}'));

	});
});

app.put('/personas/:id', (request, response) => {
	fs.readFile('personas.json', (err, data) => {
	    if (err) response.send(JSON.parse('{"status": "500", "error": ' + err + '}'));

	    let personas = JSON.parse(data);

		const update_personas = personas.map( item => {
			if(item.id == request.params.id) {
				request.body.id = request.params.id;
				return request.body;
			}
			
			return item;
		})

        fs.writeFileSync('personas.json', JSON.stringify(update_personas));
		response.send(JSON.parse('{"status": "200"}'));
	});
});

app.delete('/personas/:id', (request, response) => {
	fs.readFile('personas.json', (err, data) => {
	    if (err) response.send(JSON.parse('{"status": "500", "error": ' + err + '}'));

	    let personas = JSON.parse(data);

		const result = personas.filter(item => item.id != request.params.id);
		
		fs.writeFileSync('personas.json', JSON.stringify(result));

	    const json = JSON.parse('{"status": "200", "data": ' + JSON.stringify(result) + '}');
	    response.send(json);
	});
});

app.listen(port, () => {
	console.log('Service running in port: ' + port);
});