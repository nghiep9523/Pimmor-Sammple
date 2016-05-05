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
        type: "work",
        info: [],
        errorMessage: null
    },

    handleFetchContent: function() {
        this.setState({ info: [] });
    },

    handleUpdateContent: function(info) {
        if (info.type == this.state.type) {
            this.setState({ info: info.info, errorMessage: null });
        } else {
            this.setState({errorMessage: "Failed!"});
        }
    },

    handleGetContentFailed: function(errorMessage) {
        this.setState({ errorMessage: errorMessage });
    }
});

module.exports = WorkStore;
