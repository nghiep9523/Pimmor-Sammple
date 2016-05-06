import alt from '../alt';
import callApi from '../callApi/callApi';

class ContentActions {
    fetchContent(typeList) {
        for (let i = 0; i < typeList.length; i++) {
            let type = typeList[i];
            callApi(type).then((res) => {
                this.updateContent(res, type);
            }, (err) => {
                this.getContentFailed(err);
            });
        }

        return true;
    }

    updateContent(info, type) {
        return {
            info: info,
            type: type
        };
    }

    getContentFailed(error) {
        return error;
    }

    popupContent(info, type) {
        return {
            info: info,
            type: type
        };
    }

    hidePopup(type) {
        return type;
    }
}

module.exports = alt.createActions(ContentActions);
