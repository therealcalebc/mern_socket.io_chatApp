const express = require("express");
const app = express();

const port = 8000;
const server = app.listen(port, () => {
	console.log(`The server is listening... (port ${port})`);
});

const io = require("socket.io")(server, { cors: true });
io.on("connection", (socket) => {
	// NOTE: Each client that connects gets their own socket id!
	console.log("Nice to meet you", socket.id, ". (shakes hand)");
	// if this is logged in our terminal, that means a new client has successfully completed the handshake!

	// We add all of our additional event listeners right inside this function.
	// NOTE 'connection' is a BUILT IN event listener
	socket.on("event_from_client", (data) => {
		// socket.broadcast will emit to all other clients besides the client who is actually emitting
		socket.broadcast.emit("send_data_to_all_other_clients", data);
	});

	socket.emit("simple_string_welcome_message", `Welcome ${socket.id}`);
});
