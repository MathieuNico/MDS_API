// routes/protected.js
import express from 'express';
import { verifyToken } from '../auth/auth.js'; // Importation de la fonction de vérification du token
const router = express.Router();

// Middleware pour vérifier le token JWT
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token du header Authorization

    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }

    const decoded = verifyToken(token); // Vérifier la validité du token

    if (!decoded) {
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }

    req.user = decoded; // Ajoute les informations de l'utilisateur au req
    next();
};

// Route protégée (exemple)
router.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé à la route protégée', user: req.user });
});

module.exports = router;
