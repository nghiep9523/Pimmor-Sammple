var alt = require('../alt');
var callApi = require('../callApi/callApi');

var ContentActions = alt.createActions({
    fetchContent: function(typeList) {
        for (var i = 0; i < typeList.length; i++) {
            (function() {
                var type = typeList[i];
                callApi(type).then(function(res) {
                    ContentActions.updateContent(res, type);
                }, function(err) {
                    ContentActions.getContentFailed(err);
                });
            })();
        }
        return typeList;
    },
    updateContent: function(info, type) {
        return {
            info: info,
            type: type
        };
    },
    getContentFailed: function(error) {
        return error;
    },
    popupContent: function(info, type) {
        return {
            info: info,
            type: type
        };
    },

    hidePopup: function(type) {
        return type;
    }
});

module.exports = ContentActions;
