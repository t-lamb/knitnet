
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

// our db model
var Model = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

exports.index = function(req, res) {
	
	console.log("main route requested");

	var data = {
		status: 'OK',
		message: 'Welcome to theKnit v1 API'
	}

	// respond back with the data
	res.json(data);

}

exports.showPatternForm = function(req,res){

	res.render('patter-form.html')
}

exports.savePatternForm = function(req,res){
	console.log(req.body);

	// pull out the name and location
	var name = req.body.name;
	var type = req.body.type;
	var photo = req.body.photo;
	var description = req.body.description;
	var needleSize = req.body.needleSize;
	var yarnSize = req.body.yarnSize;


	 var pattern = Model.Pattern({
		name: name,
		type: type,
		photo: photo,
		description: description,	
	  	needleSize: needleSize,
	  	yarnSize: yarnSize,
	  });

	  // now, save that Pattern to the database
		// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save	  
	  pattern.save(function(err,data){
	  	// if err saving, respond back with error
	  	if (err){
	  		var jsonData = {status:'ERROR', message: 'Error saving Pattern'};
	  		return res.json(jsonData);
	  	}

	  	console.log('saved a new Pattern!');
	  	console.log(data);

	  	// now return the json data of the new Pattern
	  	var jsonData = {
	  		status: 'OK',
	  		Pattern: data
	  	}

	  	return res.json(jsonData);

	  })	
}

/**
 * POST '/api/create'
 * Receives a POST request of the new pattern, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Pattern
 * @return {Object} JSON
 */

exports.create = function(req,res){

	console.log(req.body);
	// pull out the name and location
	var name = req.body.name;
	var type = req.body.type;
	var photo = req.body.photo;
	var description = req.body.description;
	var needleSize = req.body.needleSize;
	var yarnSize = req.body.yarnSize;


	 var pattern = Model.Pattern({
		name: name,
		type: type,
		photo: photo,
		description: description,	
	  	needleSize: needleSize,
	  	yarnSize: yarnSize,
	  });

	  // now, save that Pattern to the database
		// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save	  
	  pattern.save(function(err,data){
	  	// if err saving, respond back with error
	  	if (err){
	  		var jsonData = {status:'ERROR', message: 'Error saving Pattern'};
	  		return res.json(jsonData);
	  	}

	  	console.log('saved a new Pattern!');
	  	console.log(data);

	  	// now return the json data of the new Pattern
	  	var jsonData = {
	  		status: 'OK',
	  		Pattern: data
	  	}

	  	return res.json(jsonData);

	  })
		
}

/**
 * GET '/api/get/:id'
 * Receives a GET request specifying the user to get
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */

exports.getOne = function(req,res){

	var requestedId = req.param('id');

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
	Model.Pattern.findById(requestedId, function(err,data){

		// if err or no user found, respond with error 
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find that Pattern'};
  		 return res.json(jsonData);
  	}

  	// otherwise respond with JSON data of the user
  	var jsonData = {
  		status: 'OK',
  		Pattern: data
  	}

  	return res.json(jsonData);
	
	})
}

/**
 * GET '/api/get'
 * Receives a GET request to get all user details
 * @return {Object} JSON
 */

exports.getAll = function(req,res){

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.find
	Model.Pattern.find(function(err, data){
		// if err or no users found, respond with error 
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find people'};
  		return res.json(jsonData);
  	}

  	// otherwise, respond with the data	

  	var jsonData = {
  		status: 'OK',
  		people: data
  	}	

  	res.json(jsonData);

	})

}


/**
 * GET '/api/type/:t'
 * Receives a GET request to get all user details
 * @return {Object} JSON
 */

exports.getType = function(req,res){

	var t = req.param('t');

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.find
	Model.Pattern.find({type:t}, function(err, data){
		// if err or no users found, respond with error 
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find people'};
  		return res.json(jsonData);
  	}

  	// otherwise, respond with the data	

  	var jsonData = {
  		status: 'OK',
  		people: data
  	}	

  	res.json(jsonData);

	})

}

/**
 * POST '/api/update/:id'
 * Receives a POST request with data of the user to update, updates db, responds back
 * @param  {String} req.param('id'). The userId to update
 * @param  {Object} req. An object containing the different attributes of the Pattern
 * @return {Object} JSON
 */

exports.update = function(req,res){

	var requestedId = req.param('id');

	// pull out the name and location
	var name = req.body.name;
	var location = req.body.location;

	//now, geocode that location
	geocoder.geocode(location, function ( err, data ) {

		console.log(data);
  	
  	// if we get an error, or don't have any results, respond back with error
  	if (err || data.status == 'ZERO_RESULTS'){
  		var jsonData = {status:'ERROR', message: 'Error finding location'};
  		res.json(jsonData);
  	}

  	// otherwise, update the user

	  var locationName = data.results[0].formatted_address; // the location name
	  var lon = data.results[0].geometry.location.lng;
		var lat = data.results[0].geometry.location.lat;
  	
  	// need to put the geo co-ordinates in a lng-lat array for saving
  	var lnglat_array = [lon,lat];

	  var dataToUpdate = {
	  	name: name,
	  	locationName: locationName,
	  	locationGeo: lnglat_array
	  };

	  // now, update that Pattern
		// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
	  Model.Pattern.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
	  	// if err saving, respond back with error
	  	if (err){
	  		var jsonData = {status:'ERROR', message: 'Error updating Pattern'};
	  		return res.json(jsonData);
	  	}

	  	console.log('updated the Pattern!');
	  	console.log(data);

	  	// now return the json data of the new Pattern
	  	var jsonData = {
	  		status: 'OK',
	  		Pattern: data
	  	}

	  	return res.json(jsonData);

	  })

	});

}

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the user to delete
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */

exports.remove = function(req,res){

	var requestedId = req.param('id');

	// Mongoose method, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
	Model.Pattern.findByIdAndRemove(requestedId,function(err, data){
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find that Pattern to delete'};
  		return res.json(jsonData);
		}

		// otherwise, respond back with success
		var jsonData = {
			status: 'OK',
			message: 'Successfully deleted id ' + requestedId
		}

		res.json(jsonData);

	})

}