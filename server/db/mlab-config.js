var mongoose = require('mongoose')
var connectionString = 'mongodb://user:user@ds141320.mlab.com:41320/kanban' //NEEDS TO BE CHANGED
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})