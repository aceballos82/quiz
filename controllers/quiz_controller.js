var models = require('../models/models.js');

// Autoload - factoriza el codigo el c�digo si ruta incluye :quizId
exports.load = function(req,res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error){next(error);});
};

//GET /quizes
exports.index = function(req,res){
	var busqueda = "%";
	if(req.query.buscar){
		busqueda = "%" + req.query.buscar.replace(" ", "%") + "%";
	}
	
	models.Quiz.findAll({where: ["pregunta like ?", busqueda], order: ["pregunta"]}).then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes});
  }
  ).catch(function(error){next(error);})
}

//GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
			res.render('quizes/show', {quiz: req.quiz});
  });
}

//GET /quizes/:id/answer
exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
		} 
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
		});
};
exports.author = function(req,res){
	res.render('author', {});
};



