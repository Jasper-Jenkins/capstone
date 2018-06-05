let router = require('express').Router()
var Trip = require('../models/Trip')
var User = require('../models/User')

//GET BY ID
router.get('/api/trips/:id', (req, res, next)=>{
   Trip.findById(req.params.id)
      .then(trip =>{
        res.status(200).send(trip)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })

  //Get Users Trips  
  router.get('/api/trips/user/:id', (req, res, next)=>{
   Trip.find({userId: req.session.uid})
    .then(trips=>{
        res.send(trips)
    })
    .catch(err=>{
        res.status(500).send(err)
    })
  })
  

  //ADD
  router.post('/api/trips', (req, res, next) => {
    var trip = req.body
    console.log(trip)
    trip.userId = req.session.uid
    Trip.create(trip)
      .then(newBoard => {
        res.status(200).send(newBoard)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //EDIT
  router.put('/api/trips/:id', (req, res, next) => {
   Trip.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(trip => {
        res.status(200).send({message: "Successfully Updated", trip})
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //DESTROY
  router.delete('/api/trips/:id', (req, res, next)=>{
   Trip.findByIdAndRemove(req.params.id)
      .then(data=>{
        res.send("Successfully Deleted trip")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })

module.exports = {
    router
  }