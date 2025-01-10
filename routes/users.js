import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

/* GET users listing. */
router.get('/user', async function(req, res, next) {
  try {
    const users = await User.findAll(); // Utilisez findAll() pour Sequelize
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
