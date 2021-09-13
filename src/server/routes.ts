import * as express from 'express';
const cheeses = require('./data/cheeses.json');
const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

let purchases: any = [];

router.post('/api/purchases', (req, res, next) => {
    purchases.push(req.body);
});

router.get('/api/purchases', (req, res, next) => {
    res.send(purchases);
});

export default router;