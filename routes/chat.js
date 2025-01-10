import {Router} from 'express';
import { Server } from 'socket.io';


const router = Router();

/* GET users listing. */
export default function chatRouter(server) {
  router.get('/chat', function(req, res, next) {
    res.render('chat', { title: 'Chat' });
  });

  
  const io = new Server(server);
  io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });
  return router;
}
