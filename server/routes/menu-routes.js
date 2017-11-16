var router = require('express').Router()
var Burgers = require('../models/burger')
var Sides = require('../models/side')
var Drinks = require('../models/drink')



router
  .get('/api/menu', (req, res, next) => {
    Promise.all([
      Burgers.find({}).select('name price'),
      Drinks.find({}).select('name sizes.m'),
      Sides.find({}).select('name price')
    ])
      .then(results => res.send({
        burgers: results[0],
        drinks: results[1],
        sides: results[2]
      }))
      .catch()
    //     Burgers.find({})
    //         .then(burgers => {
    //             Sides.find({})
    //                 .then(sides => {
    //                     Drinks.find({})
    //                         .then(drinks => {
    //                             res.send({
    //                                 burgers,
    //                                 drinks,
    //                                 sides
    //                             })
    //                         }).catch()
    //                 }).catch()
    //         }).catch()
  })



module.exports = router
