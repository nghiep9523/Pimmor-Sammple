var alt = require('../alt');
var fetchData = require('../fetchdata/FetchData');

var ContentActions = alt.createActions({
    fetchContent: function(type) {
        var url = '/' + type;
        var ret;
        var success = false;
        request
            .get(url)
            .type('json')
            .end(function(err, res) {
                    if (err || !res.ok) {
                        ContentActions.getContentFailed(err);
                    } else {
                        if (type == 'creator') {
                            ContentActions.updateContentWork(res.body);
                        } else {
                            ContentActions.updateContentCreator(res.body);
                        }
                    }
                }
            });
    return type;
},
updateContentWork: function(info) {
    return info;
},
updateContentCreator: function(info) {
    return info;
},
getContentFailed: function(error) {
    return error;
},
popupContent: function(info) {
    return info;
}
});

module.exports = ContentActions;
