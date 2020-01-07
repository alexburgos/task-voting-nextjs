import io from 'socket.io';

const connecIO = handler => async (req, res) => {
  const ioServer = new io();

  ioServer.on('connection', socket => {
		console.log(`Socket ${socket.id} connected.`);

		socket.on('disconnect', () => {
			console.log(`Socket ${socket.id} disconnected.`);
		});
	});


	return handler(req, res);
};

export default connecIO;
