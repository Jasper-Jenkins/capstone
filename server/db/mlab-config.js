var mongoose = require('mongoose')
var connectionString = 'mongodb://Jasper:student1@ds247670.mlab.com:47670/capstone'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})