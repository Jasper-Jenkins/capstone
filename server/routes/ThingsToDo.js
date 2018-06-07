var router = require('express').Router()
var ToDo = require('../models/ThingToDo')

//GET BY ID
router.get('/api/thingstodo/:id', (req, res, next) => {
  ToDo.findById(req.params.id)
    .then(task => {
      res.status(200).send(task)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//get by category and place id
router.get('/api/thingstodo/:placeId/:category', (req, res) => {
  ToDo.find({
    place_id: req.params.placeId
  })
   .then(thingstodo => {
     var filterTodos = thingstodo.filter(todo => {
       if (todo.categories.includes(req.params.category)) {
         return todo.published
       }
     })
     res.status(200).send(filterTodos)
   })
   .catch(err => {
     res.status(400).send(err)
   })
})

router.get('/api/destinations/:destinationId/thingstodo', (req, res, next) => {
  ToDo.find({ destinationId: req.params.destinationId })
    .then(thingstodo => {
      res.status(200).send(thingstodo)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})
//ADD
router.post('/api/thingstodo', (req, res, next) => {
  console.log(req.body)
  var todo = req.body
  todo.userId = req.session.uid
  ToDo.create(todo)
    .then(newThingToDo => {
      res.status(200).send(newThingToDo)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/thingstodo/:id', (req, res, next) => {
  ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(thingtodo => {
      res.status(200).send({ message: "Successfully Updated", thingtodo })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/thingstodo/:id', (req, res, next) => {
  ToDo.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send("Successfully Deleted To Do")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})


module.exports = {
  router
}