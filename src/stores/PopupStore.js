import alt from '../alt';
import ContentActions from '../actions/ContentActions';

class PopupStore {
    constructor() {
        this.bindListeners({
            handlePopupContent: ContentActions.POPUP_CONTENT,
            handleHidePopup: ContentActions.HIDE_POPUP
        });
        this.state = {
            type: "",
            info: null,
            show: false
        };
    }

    handlePopupContent(data) {
        this.setState({ info: data.info, type: data.type, show: true });
    }

    handleHidePopup() {
        this.setState({ show: false });
    }
};

export default alt.createStore(PopupStore, 'PopupStore');
