var alt = require('../alt');
var ContentActions = require('../actions/ContentActions');

var WorkStore = alt.createStore({
    displayName: 'Work Store',

    bindListeners: {
        handleFetchContent: ContentActions.FETCH_CONTENT,
        handleUpdateContent: ContentActions.UPDATE_CONTENT,
        handleGetContentFailed: ContentActions.GET_CONTENT_FAILED
    },

    state: {
        info: [],
        errorMessage: null
    },

    handleFetchContent: function() {
        this.setState({ info: [] });
    },

    handleUpdateContent: function(info) {
        this.setState({ info: info, errorMessage: null });
    },

    handleGetContentFailed: function(errorMessage) {
        this.setState({ errorMessage: errorMessage });
    }
});

module.exports = WorkStore;
