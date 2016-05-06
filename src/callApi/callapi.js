import request from 'superagent';
import Promise from 'promise';

var callApi = function(type) {
    return new Promise(function(resolve, reject) {
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

export default callApi;
