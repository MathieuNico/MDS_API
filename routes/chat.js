import {Router} from 'express';
import { Server } from 'socket.io';
import dab from '../services/dab.mjs';

const router = Router();
const regexDab = /^dab (\d+)(€|\$)$/; 

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
      const match= msg.match(regexDab);
      if(match){
        const montant = parseInt(match[1], 10); // Extraire le montant
        const devise = match[2]; // Extraire la devise (€/ $)

        const billet = {
            devise: devise,
            montant: montant,
            euro: [500, 200, 100, 50, 20, 10, 5],
            dollar: [100, 50, 20, 10, 5, 1]
        };
        const coupureResult = dab(billet);
  
        io.emit('chat message', `Résultat pour ${montant}${devise} :\n${coupureResult}`);
      }
      else {
        io.emit('chat message', msg);
      }
    });
    
      
      
  });
  return router;
}
