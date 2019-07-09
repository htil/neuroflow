const connect = require('connect');
const serveStatic = require('serve-static');
const path = require("path");

connect().use(serveStatic(path.join(__dirname, "public"))).listen(8080, function(){
	console.log('Server running on 8080...');
});