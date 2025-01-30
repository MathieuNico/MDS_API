import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Clé secrète utilisée pour signer le JWT (doit être gardée secrète)
const secretKey = process.env.JWT_SECRET_KEY || crypto.randomBytes(32).toString('hex');
console.log(secretKey);

// Fonction pour générer un JWT
export const generateToken = (user) => {
    // Payload du token (ici l'ID et le login de l'utilisateur)
    const payload = {
        id: user.IdUsers,
        login: user.Login,
    };

    // Options du token (validité de 1 heure)
    const options = { expiresIn: '1h' };

    // Générer le JWT
    
    return jwt.sign(payload, secretKey, options);
};

// Fonction pour vérifier un JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey); // Décode et vérifie la validité du token
    } catch (error) {
        return null; // Si le token est invalide ou expiré, renvoie null
    }
};