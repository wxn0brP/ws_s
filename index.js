const WebSocketServer = require('ws');
const lo = console.log;
const wss = new WebSocketServer.Server({ port: 8080 })

function getUniqueID(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on("connection", ws => {
	console.log("new client connected");
	ws.id = getUniqueID();
	ws.on("message", data => {
		data = data.toString();
		wss.clients.forEach(client => {
			if(client.id != ws.id) client.send(data);
		});
	});

	ws.on("close", () => {
		console.log("the client has connected");
	});
	ws.onerror = function(){}
});
console.log("The WebSocket server is running on port 8080");