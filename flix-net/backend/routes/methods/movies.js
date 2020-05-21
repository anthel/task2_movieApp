const { MovieModel } = require("../../db");

addMoviesToDb = (req, res, next) => {

  req.models.MovieModel.find()
  .then((response)=>{
    if(response.length > 0){
      res.status(204).send();
    }
    req.models.MovieModel.insertMany(req.models.movies)
    .then((response) => {
      return res.status(201).send(response);
    }).catch((error) => {
      next(error);
    })
  })
}

postMovies = (req, res, next) => {
  req.models.MovieModel.insertMany(req.models.movies)
  .then((response) => {
    return res.status(201).send(response);
  })

}




module.exports = {
  addMoviesToDb,
  
};