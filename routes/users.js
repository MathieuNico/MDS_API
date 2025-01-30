import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

/* GET users listing. */
router.get('/user', async function(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ['Login', 'Password']
    });// Utilisez findAll() pour Sequelize
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/user', async function(req, res, next) {
  try{
    const {login, password} = req.body;
    
    const newUser = await User.create({
      Login: login,
      Password: password
    });
    res.status(201).send('User created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'inscription');
  }
});

export default router;
