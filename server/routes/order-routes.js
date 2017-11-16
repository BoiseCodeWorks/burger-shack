var Orders = require('../models/order')
var router = require('express').Router()


router.get('/api/orders', (req, res, next)=>{
    Orders.find({})
        .then(orders =>{
            res.send(orders)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

router.get('/api/orders/:id', (req, res, next)=>{
    Orders.findById(req.params.id)
        .populate('drinks')
        .populate('burgers')
        .populate('sides')
        .then(order=>{
            res.send(order)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

router.post('/api/orders', (req, res, next)=>{
    req.body.userId = req.session.uid
    Orders.create(req.body)
        .then(order => {
            let response = {
                data: order,
                message: 'Successfully created Order!'
            }
            res.send(response)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})


router.put('/api/orders/:id', (req, res, next)=>{
    var action = 'Update Order'
    Orders.findByIdAndUpdate(req.params.id, req.body)
        .then(data=>{
            res.send(data)
        })
        .catch(err =>{
            res.status(400).send(err)
        })
})


router.delete('/api/orders/:id', (req, res, next)=>{
    Orders.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.send({message: 'So much for that order'})
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})


module.exports = router