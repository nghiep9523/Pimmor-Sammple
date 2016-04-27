var CREATOR_URL = "http://localhost:8080/creator";
var WORK_URL = "http://localhost:8080/work";
var CREATOR_TYPE = 'CREATOR';
var WORK_TYPE = 'WORK';

window.addEventListener('load', function() {
    var creators = document.getElementsByClassName('creators');
    var creatorRow = creators[0].getElementsByClassName('row_detail')[0];

    var works = document.getElementsByClassName('works');
    var workRow = works[0].getElementsByClassName('row_detail')[0];

    var creatoHtml = '<a class="item" href="#">';
    var workHtml = '<a class="item" href="#">';

    initContentJSON(CREATOR_URL, creatoHtml, creatorRow, CREATOR_TYPE);
    initContentJSON(WORK_URL, workHtml, workRow, WORK_TYPE);

    document.getElementsByClassName('popup-close')[0].addEventListener('click', function(e) {
        closePopup();
    }, false);

});

function showPopupAddClick(block, index, type) {
    block.addEventListener('click', function(e) {
        showPopup(index, type);
    }, false);
}

function initItemClickListener(target, type) {
    var itemList = target.getElementsByClassName('item');
    for (var i = 0; i < itemList.length; i++) {
        showPopupAddClick(itemList[i], i, type);
    }
}

function getHTML(id, type) {
    if (type == CREATOR_TYPE) {
        var creators = document.getElementsByClassName('creators');
        var item = creators[0].getElementsByClassName('item');
    } else {
        var works = document.getElementsByClassName('works');
        var item = works[0].getElementsByClassName('item');
    }
    var html = item[id].innerHTML;
    return html;
}

var getPopup = function() {
    var popup = document.getElementsByClassName("popup")[0];
    var overlay = document.getElementsByClassName("popup-overlay")[0];
    return {
        popup: popup,
        overlay: overlay
    }
}

function showPopup(id, type) {
    var html = getHTML(id, type);

    var popup_content = document.getElementsByClassName("popup-content")[0];

    var popupLayout = getPopup();
    var popup = popupLayout.popup;
    var overlay = popupLayout.overlay;

    popup_content.innerHTML = html;

    overlay.setAttribute("class", "popup-overlay show");
    popup.setAttribute("class", "popup show");
}

function closePopup() {
    var closePopup = document.getElementsByClassName("popup-close")[0];

    var popupLayout = getPopup();
    var popup = popupLayout.popup;
    var overlay = popupLayout.overlay;

    overlay.setAttribute("class", "popup-overlay hide");
    popup.setAttribute("class", "popup hide");
}

function initContentJSON(url, outHTML, target, type) {
    var req = new XMLHttpRequest();
    var JSONobj;
    req.open("GET", url, true);
    req.addEventListener("load", function() {
        if (req.status == 200) {
            try {
                jSONobj = JSON.parse(req.responseText);
                outHTML += buildDiv(url, jSONobj, type);
                target.innerHTML = outHTML;
                initItemClickListener(target, type);
            } catch (e) {
                console.log(e);
            }
        }
    });
    req.send(null);
}

function jSONtoHTML(url, JSON, id, type) {
    var last = url.lastIndexOf('/');
    var filename = url.substr(last + 1);
    var outHTML = '<img src="';
    if (type == CREATOR_TYPE) {
        outHTML += JSON.creator[id].img;
        outHTML += '"'
        outHTML += 'alt="Creator Image">';
        outHTML += '<div><p class="name"><span>';
        outHTML += JSON.creator[id].name;
        outHTML += '</span></p><p class="job"><span>';
        outHTML += JSON.creator[id].job;
        outHTML += "</span></p></div>";
    } else {
        outHTML += JSON.work[id].img;
        outHTML += '" alt="Work Image">';
    }
    return outHTML;
}

function buildDiv(url, jSONobj, type) {
    var outHTML = "";
    if (type === CREATOR_TYPE) {
        for (var i = 0; i < jSONobj.creator.length; i++) {
            outHTML += jSONtoHTML(url, jSONobj, i, type);
            if (i != jSONobj.creator.length - 1)
                outHTML += '</a><a class="item" href="#">';
        }
    } else {
        for (var i = 0; i < jSONobj.work.length; i++) {
            outHTML += jSONtoHTML(url, jSONobj, i, type);
            if (i != jSONobj.work.length - 1)
                outHTML += '</a><a class="item" href="#">';
        }
    }
    outHTML += "</a>";
    return outHTML;
}


