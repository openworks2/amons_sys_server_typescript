"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var path = require("path");
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express_1.default.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(logger('dev'));
var index_1 = __importDefault(require("./routes/index"));
var accountRouter_1 = __importDefault(require("./routes/accountRouter"));
var localRouter_1 = __importDefault(require("./routes/localRouter"));
var companyRouter_1 = __importDefault(require("./routes/companyRouter"));
var announceRouter_1 = __importDefault(require("./routes/announceRouter"));
var beaconRouter_1 = __importDefault(require("./routes/beaconRouter"));
var vehicleRouter_1 = __importDefault(require("./routes/vehicleRouter"));
var workerRouter_1 = __importDefault(require("./routes/workerRouter"));
var cctvRouter_1 = __importDefault(require("./routes/cctvRouter"));
var scannerRouter_1 = __importDefault(require("./routes/scannerRouter"));
var digRouter_1 = __importDefault(require("./routes/digRouter"));
var processRouter_1 = __importDefault(require("./routes/processRouter"));
app.use("/api", index_1.default);
app.use("/api/account", accountRouter_1.default);
app.use("/api/local", localRouter_1.default);
app.use("/api/company", companyRouter_1.default);
app.use("/api/announce", announceRouter_1.default);
app.use("/api/beacon", beaconRouter_1.default);
app.use("/api/vehicle", vehicleRouter_1.default);
app.use("/api/worker", workerRouter_1.default);
app.use("/api/cctv", cctvRouter_1.default);
app.use("/api/scanner", scannerRouter_1.default);
app.use("/api/dig", digRouter_1.default);
app.use("/api/process", processRouter_1.default);
app.listen(port, function () {
    console.log("express in running on " + port);
});