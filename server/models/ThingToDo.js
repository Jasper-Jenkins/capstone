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
    type: String, enum: ['airport',
      'amusement_park',
      'aquarium',
      'art_gallery',
      'bakery',
      'bank',
      'bar',
      'beauty_salon',
      'book_store',
      'bowling_alley',
      'cafe',
      'campground',
      'car_rental',
      'casino',
      'church',
      'city_hall',
      'clothing_store',
      'convenience_store',
      'department_store',
      'electronics_store',
      'embassy',
      'florist',
      'gas_station',
      'furniture_store',
      'gym',
      'hardware_store',
      'hindu_temple',
      'home_goods_store',
      'jewelry_store',
      'library',
      'liquor_store',
      'locksmith',
      'lodging',
      'meal_delivery',
      'meal_takeaway',
      'mosque',
      'movie_rental',
      'movie_theater',
      'museum',
      'night_club',
      'park',
      'pet_store',
      'pharmacy',
      'restaurant',
      'rv_park',
      'school',
      'shoe_store',
      'shopping_mall',
      'spa',
      'stadium',
      'store',
      'subway_station',
      'supermarket',
      'synagogue',
      'train_station',
      'travel_agency',
      'transit_station',
      'zoo',
      'food',
      'point_of_interest',
      'place_of_worship'], required: true
  }],
  place_id: { type: String, required: true },
  rating: { type: Number },
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
    ref: 'Destination'
  }
})

module.exports = mongoose.model(schemaName, todoSchema)