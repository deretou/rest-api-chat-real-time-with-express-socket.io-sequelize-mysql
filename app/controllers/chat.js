const models = require('../models')

//users
exports.index = (req,res) => {

  models.User.findAll({
    where: {
      id: {[res.Op.notIn]:[req.userData.id]}
    }
  }).then((results) => {
      res.json(results)
  })

}

//sendChat
exports.send = (req,res) => {

  req.check('chat','Chat is required').not().isEmpty()

  const errors = req.validationErrors()
  if (errors){
    res.status(400).json(errors)
  } else{
    models.Chat.create({
      chat: req.body.chat,
      fromUserId:req.userData.id,
      toUserId:req.params.id
    })
      .then((results) => {
        res.json(results)
      })
  }

}

//showChat
exports.show = (req,res) => {
  
  models.Chat.findAll({
    where: {
      [res.Op.or]: [
        {
          fromUserId: req.userData.id,
          toUserId: req.params.id
        },{
          fromUserId: req.params.id,
          toUserId: req.userData.id
        }
      ]
    }
  }).then((results) => {
      res.json(results)
  })

}