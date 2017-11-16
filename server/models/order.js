var mongoose = require('mongoose')
var ObjectId = mongoose.SchemaTypes.ObjectId

var schema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: ObjectId, required: true, ref: 'User' },
    burgers: [{ type: ObjectId, ref: 'Burger' }],
    sides: [{ type: ObjectId, ref: 'Side' }],
    drinks: [{ type: ObjectId, ref: 'Drink' }]
})


module.exports = mongoose.model('Order', schema)