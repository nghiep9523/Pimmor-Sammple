var request = require('superagent');
var Promise = require('promise');

var callApi = function(type) {
	return new Promise (function(resolve, reject){
		request
			var url = '/' + type;
        
        request
            .get(url)
            .type('json')
            .end(function(err, res) {
                if (err || !res.ok)
                   	reject(err);
                else {
					resolve(res.body);                    
                }
            });
	});
}

module.exports = callApi;