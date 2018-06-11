var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'ThingsToDo'
var ObjectId = Schema.Types.ObjectId

let todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  gallery: [{ type: String }],
  categories: [{
    type: String, required: true
  }],
  place_id: { type: String, required: true },
  rating: { type: Number },
  published: { type: Boolean, default: true },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  tripId: {
    type: ObjectId,
    ref: 'Trip',
    required: true
  },
  destinationId: {
    type: ObjectId,
    ref: 'Destination',
    required: true
  }
})

module.exports = mongoose.model(schemaName, todoSchema)