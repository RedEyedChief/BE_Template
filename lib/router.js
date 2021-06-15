import express      from 'express';
import controllers  from './controllers/index.js';

const router = express.Router();

router.get('/tests/list', controllers.test.list);
router.post('/tests', controllers.test.create);

router.get('/z', (req, res) => {
  res.send('Zdorovenki buly');
});

export default router;
