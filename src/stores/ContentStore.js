import alt from '../alt';
import ContentActions from '../actions/ContentActions';

class ContentStore {
    constructor() {
        this.bindListeners({
            handleFetchContent: ContentActions.FETCH_CONTENT,
            handleUpdateContent: ContentActions.UPDATE_CONTENT,
            handleGetContentFailed: ContentActions.GET_CONTENT_FAILED
        });
        this.state = {
            info: {},
            errorMessage: null,
            isLoading: null
        }
    }

    handleFetchContent(res) {
        this.setState({ info: {}, isLoading: res });
    }

    handleUpdateContent(info) {
        var temp = this.state.info;
        temp[info.type] = info.info;
        this.setState({ info: temp, errorMessage: null, isLoading: false });
    }

    handleGetContentFailed(errorMessage) {
        this.setState({ errorMessage: errorMessage });
    }
};

export default alt.createStore(ContentStore, 'ContentStore');
