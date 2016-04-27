var express = require("express");
var fs = require('fs');
var app = express();
var jSONObjCreator = require('./src/creator_info/creator_info.json');
var jSONObjWork = require('./src/work_info/work_info.json');
var CREATOR_TYPE = 'CREATOR';
var WORK_TYPE = 'WORK';

function randomJSONObj(obj, type) {
    var jSONObj = [];
    var random = Math.floor((Math.random() * obj.length) + 1);
    var count = 0;
    while (count < random) {
        var i = Math.floor((Math.random() * obj.length));
        jSONObj.push(obj[i]);
        count++;
    }
    return jSONObj;
}

app.get("/", function(req, res) {
    res.sendFile('index.html', { root: __dirname })
});

app.get("/creator", function(req, res) {
    var jSONObj = {"creator": null};
    var retJSON = randomJSONObj(jSONObjCreator.creator, CREATOR_TYPE);

    jSONObj.creator = retJSON;

    res.json(jSONObj);
});

app.get("/work", function(req, res) {
    var jSONObj =  {"work": null};
    var retJSON = randomJSONObj(jSONObjWork.work, WORK_TYPE);

    jSONObj.work = retJSON;

    res.json(jSONObj);
});

app.use("/image/creator", express.static(__dirname + '/src/img/creators'));

app.use("/image/work", express.static(__dirname + '/src/img/works'));

app.use(express.static(__dirname));

app.listen(8080, function() {
    console.log("Listening on 8080");
});