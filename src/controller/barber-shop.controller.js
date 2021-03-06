const express = require('express');
const router = express.Router();
const barberShopRepository = require('../repository/barber-shop.repository')
const security = require('../util/security');


//Public routes
router.get('/', (req, res) => {
    res.send(barberShopRepository.getAll())
})

router.get('/:id', (req, res) => {
    res.send(barberShopRepository.getOne(parseInt(req.params.id)))
})


//Need authentication routes
router.get('/:id/rating', security.isAuthenticated, (req, res) => {
    res.send(barberShopRepository.getRating(req.params.id))
})


//Administrator routes
router.post('/', security.isAuthenticated, (req, res) => {
    if(!req.user.hasRole('ADMIN')) {
        return res.status(401).send({ error: 'You are not allowed to perform this action' });
    };
    res.send(barberShopRepository.insert(req.body));
})

router.put('/:id', security.isAuthenticated, (req, res) => {
    if(!req.user.hasRole('ADMIN')) {
        return res.status(401).send({ error: 'You are not allowed to perform this action' });
    };
    res.send(barberShopRepository.update(parseInt(req.params.id), req.body));
})

router.delete('/:id', security.isAuthenticated, (req, res) => {
    if(!req.user.hasRole('ADMIN')) {
        return res.status(401).send({ error: 'You are not allowed to perform this action' });
    };
    barberShopRepository.remove(parseInt(req.params.id), req.body);
    res.sendStatus(200);
})


//User routes
router.post('/:id/schedule', (req, res) => {
    if(!req.user.hasRole('USER')) {
        return res.status(401).send({ error: 'You are not allowed to perform this action' });
    };
    res.send(barberShopRepository.schedule(req.params.id, req.body))
})

router.post('/:id/rate', (req, res) => {
    if(!req.user.hasRole('USER')) {
        return res.status(401).send({ error: 'You are not allowed to perform this action' });
    };
    res.send(barberShopRepository.rate(req.params.id, req.body))
})

module.exports = router;