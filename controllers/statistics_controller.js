var models = require('../models/models.js');

var statistics = { quizesTotal: 0,
		 commentsTotal: 0,
		 quizesConComments: 0
		 };

//GET /quizes/statistics
exports.index = function(req,res){
	res.render('statistics/index', {statistics: statistics, errors: []});
};

exports.calculate = function(req,res, next){
	models.Quiz.count().then(function(numQuizes){
			statistics.quizesTotal = numQuizes;
			return models.Comment.count();
		}).then(function(numComments){
			statistics.commentsTotal = numComments;
			return models.Comment.findAll({attributes: ['QuizId'], group: ['QuizId']});
		}).then(function(numQuizesConComments){
			statistics.quizesConComments = numQuizesConComments.length;
		}).catch(function(error){next(error);
		}).finally(function(){next();
		});		
};
