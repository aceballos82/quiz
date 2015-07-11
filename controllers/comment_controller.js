var models = require('../models/models.js');

//Autoload :id de comentarios
exports.load = function (req, res, next, commentId){
	models.Comment.find({
		where:{
		   	id: Number(commentId)
			}
		}).then(function(comment){
			if(comment){
				req.comment = comment;
				next();
			}else{
				next(new Error('No existe commentId=' + commentId));
			}
		}).catch(function(error){next(error);});
};

//GET /quizes/:quizId/comments/new
exports.new = function(req,res){
	res.render('comments/new.ejs', {quizId: req.params.quizId, errors: []});
};

//POST /quizes/:quizId/comments
exports.create = function(req,res){
	var comment = models.Comment.build( {texto: req.body.comment.texto, QuizId: req.params.quizId} );
	// guarda en BD los campos pregunta y respuesta de quiz
	var errors = comment.validate();
	
	if(errors){
			var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
			for (var prop in errors) errores[i++]={message: errors[prop]}; 
			res.render('comments/new.ejs', {comment: comment, quizId: req.params.quizId, errors: errores});
	}else{
			comment.save({fields: ["texto", "QuizId"]}).then(function(){
					res.redirect('/quizes/'+req.params.quizId);   // Redireccion HTTP (URL relativo) lista de preguntas
			}); 
	}
};

//GET /quizes/:quizId/comment/:commentId/publish
exports.publish = function(req, res){
	req.comment.publicado = true;
	req.comment.save ({fields: ["publicado"]}).then (function(){
				res.redirect('/quizes/' + req.params.quizId);}
			).catch(function(error){next(error)});
};
