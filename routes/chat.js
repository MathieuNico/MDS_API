import { Router } from 'express';
import { Server } from 'socket.io';
import { verifyToken } from '../auth/auth.js'; // Import de verifyToken
import dab from '../services/dab.mjs';
import { authenticateJWT } from '../middleware/verificate.js';

const router = Router();
const regexDab = /^dab (\d+)(€|\$)$/;

export default function chatRouter(server) {
    router.get('/chat',authenticateJWT, function(req, res, next) {
        res.render('chat', { title: 'Chat' });
    });

    const io = new Server(server, {
        cors: {
            origin: "*", // Autoriser toutes les connexions
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        try {
            const cookie = socket.handshake.headers.cookie;
            if (!cookie) return next(new Error("No cookies found"));

            const token = cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            if (token) {
                const decoded = verifyToken(token);
                if (decoded) {
                    socket.user = decoded; 
                    return next();
                }
            }
            return next(new Error("Authentication error"));
        } catch (error) {
            return next(new Error("Invalid token"));
        }
    });

    io.on('connection', function(socket) {
        console.log(`User connected: ${socket.user.login}`);

        socket.on('disconnect', function() {
            console.log(`User disconnected: ${socket.user.login}`);
        });

        socket.on('chat message', function(msg) {
            const match = msg.match(regexDab);
            if (match) {
                const montant = parseInt(match[1], 10);
                const devise = match[2];

                const billet = {
                    devise: devise,
                    montant: montant,
                    euro: [500, 200, 100, 50, 20, 10, 5],
                    dollar: [100, 50, 20, 10, 5, 1]
                };
                const coupureResult = dab(billet);

                io.emit('chat message', {
                    user: socket.user.login,
                    text: `Résultat pour ${montant}${devise} :\n${coupureResult}`
                });
            } else {
                io.emit('chat message', {
                    user: socket.user.login,
                    text: msg
                });
            }
        });
    });

    return router;
}
