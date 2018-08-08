const jwt = require('jsonwebtoken')
const User = require('../models/users')
module.exports = (req, res, next) => {
  try {
    var token = req.headers['authorization']
    const decoded = jwt.verify(token.split(' ')[1], 'kljuc')
    req.userData = decoded
    User.findById(req.userData.userId).exec().then(res => {
      if (res) next()
      else return res.status(401).json({message: 'Unauthorised'})
    }).catch(err => { return res.status(401).json({message: err.statusText}) })
  } catch (error) {
    return res.status(401).json({message: 'Auth failed'})
  }
}
