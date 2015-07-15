var models = require('../models/models.js');

var statistics = { quizesTotal: 0,
		 commentsTotal: 0,
		 quizesConComments: 0
		 };

//GET /quizes/statistics
exports.index = function(req,res){
	
	models.Quiz.count().then(function(numQuizes){
			statistics.quizesTotal = numQuizes;
			return models.Comment.count();
		}).then(function(numComments){
			statistics.commentsTotal = numComments;
			return models.Comment.findAll({attributes: ['Comments.id'], group: ['QuizId']});
		}).then(function(numQuizesConComments){
			console.log(numQuizesConComments);
			statistics.quizesConComments = numQuizesConComments.length;
		}).catch(function(error){next(error);});		
		
		res.render('statistics/index', {statistics: statistics, errors: []});
};
