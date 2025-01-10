import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/connexion', function(req, res, next) {
  res.render('connexion', { title: 'Connexion' });
});

router.get('/inscription', function(req, res, next) {
  res.render('inscription', { title: 'Inscription' });
});


export default router;
