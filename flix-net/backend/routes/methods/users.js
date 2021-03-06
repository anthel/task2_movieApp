// Methods available for handling users

getCurrentUser = (req, res, next) => {
  req.models.User.findOne({username: req.params.currentUser})
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((error) => {
      next(error)
    });
}

createUser = (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body
  req.models.User.create({
    firstname, 
    lastname, 
    username, 
    email, 
    password
  })
  .then(result => res.status(201).send(result))
  .catch(error => next(error))
}

loginUser = (req, res, next) => {
  const { username, password } = req.body
  req.models.User.find()
  .then(users => users.find(user => user.username === username && user.password === password))
  .then(autenticatedUser => autenticatedUser ? res.status(202).send() : res.status(404).send())
  .catch(error => next(error))
}

saveMovieToUser = (req, res, next) =>{
  req.models.User.findOneAndUpdate({username: req.params.username},
    {$addToSet:{
      watchList: req.body.movie
    }})
  .then(() => {
    res.status(200).send()
  }).catch((error) => {
    next(error);
  })
}

removeMovieFromUser =(req, res, next) =>{
  req.models.User.findOneAndUpdate({username: req.params.username},

    {$pull:{
      watchList: req.body.movie
    }})

  .then(() => {
    res.status(200).send()
  }).catch((error) => {
    next(error);
  })
}

module.exports = {
  getCurrentUser,
  createUser,
  loginUser,
  saveMovieToUser,
  removeMovieFromUser
};


