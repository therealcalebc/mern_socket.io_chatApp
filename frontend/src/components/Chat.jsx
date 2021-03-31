import { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = (props) => {
	// notice that we pass a callback function to initialize the socket
	// we don't need to destructure the 'setSocket' function since we won't be updating the socket state
	const [socket] = useState(() => io(":8000"));
	const [message, setMessage] = useState("");

	useEffect(() => {
		// we need to set up all of our sevent listeners in the useEffect callback function
		console.log("Is this running?");
		socket.on("simple_string_welcome_message", (data) => {
			console.log(data);
			setMessage(data);
		});

		// NOTE that we're returning a callback function
		// this ensures that the underlying socket will be closed if App is unmounted
		// this would be more critical if we were creating the socket in a subcomponent
		return () => socket.disconnect(true);
	}, [socket]);

	return (
		<div>
			<blockquote>{message}</blockquote>
		</div>
	);
};

export default Chat;
