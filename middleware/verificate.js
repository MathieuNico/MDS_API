import { verifyToken } from '../auth/auth.js';

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token; // Récupérer le token depuis le cookie

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(403).send('Invalid token');
    }
  } else {
    res.redirect('/connexion');
  }
};
