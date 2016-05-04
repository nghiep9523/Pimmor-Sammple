var alt = require('../alt');
var callApi = require('../callApi/callApi');

var ContentActions = alt.createActions({
    fetchContent: function(typeList) {
        for (var i = 0; i < typeList.length; i++) {
            callApi(typeList[i]).then(function(res) {
                updateContent(res);
            });
        }
        return typeList;
    },
    updateContent: function(info) {
        return info;
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

    hidePopup: function(type){
        return type;
    }
});

module.exports = ContentActions;
