import express from 'express';
import User from '../models/userModel.js';
import { where } from 'sequelize';
import {generateToken} from '../auth/auth.js';

const router = express.Router();

/* GET users listing. */
router.get('/user', async function(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ['IdUsers', 'Login', 'Password']
    });// Utilisez findAll() pour Sequelize
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:id', async function(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: ['IdUsers', 'Login', 'Password']
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération');
  }
});

router.post('/user', async function(req, res, next) {
  try{
    const {Login, Password} = req.body;
    const newUser = await User.create({
      Login: Login,
      Password: Password
    });
    res.status(201).send('User created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'inscription');
  }
});

router.post('/user/login', async function(req, res, next) {
  try {
    const { login, password } = req.body;
    const UserConnected = await User.findOne({
      where: {
        Login: login,
        Password: password
      }
    });

    if (UserConnected) {
      const token = generateToken(UserConnected);
      
      // Stocke le token dans un cookie sécurisé
      res.cookie('token', token, {
        httpOnly: true, // Empêche l'accès au cookie via JavaScript (protection XSS)
        secure: process.env.NODE_ENV === 'production', // Active Secure en production (HTTPS)
        sameSite: 'Strict', // Protège contre les attaques CSRF
        maxAge: 3600000 // Expire après 1 heure (1h = 3600000 ms)
      });

      res.json({ message: 'User logged in' });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la connexion');
  }
});

router.delete('/user/:id', async function(req, res, next) {
  try {
    const userId = req.params.id;

    // Supprimer l'utilisateur
    const UserDeleted = await User.destroy({
      where: {
        IdUsers: userId
      }
    });

    if (UserDeleted) {
      res.status(204).send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression');
  }
});

router.put('/user/:id', async function(req, res, next) {
  try{
    const userId = req.params.id;
    const {Login, Password} = req.body;

    const user = await User.findByPk(userId);
    if (user) {
      user.Login = Login;
      user.Password = Password;
      await user.save();
      res.send('User updated');
    } else {
      res.status(404).send('User not found');
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la modification');
  }
});

router.post('/user/logout', (req, res) => {
  res.clearCookie('token', { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'Strict' 
  });
  res.redirect('/connexion');
});


export default router;
