var alt = require('../alt');
var ContentActions = require('../actions/ContentActions');

var PopupStore = alt.createStore({
    displayName: 'Popup Store',

    bindListeners: {
        handlePopupContent: ContentActions.POPUP_CONTENT,
        handleHidePopup: ContentActions.HIDE_POPUP
    },

    state: {
        type: "",
        info: null,
        show: false
    },

    handlePopupContent: function(data) {
        this.setState({info : data.info, type: data.type, show: true});
    },
    
    handleHidePopup: function() {
        this.setState({show: false});
    }

});

module.exports = PopupStore;
