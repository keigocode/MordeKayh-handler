const express = require('express');
const app = express();
const path = require('path');

app.use((req, res) => {
	res.status(400).send({ reponse: 'Failed, not found de page', code: 404 });
});

app.listen(1000, () => {
	console.log('server on port 1000');
});

module.exports = {app};