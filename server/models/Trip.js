var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Trip'
var ObjectId = Schema.Types.ObjectId
var Destination = require('./Destination')


let tripSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  author: {type: String},
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
})
// tripSchema.pre('delete', function(req, res, next){
//   Destination.find({tripId: this._id})
//   .remove(data=>{
//     console.log(data)
//      next()
//   })

// })
module.exports = mongoose.model(schemaName, tripSchema)