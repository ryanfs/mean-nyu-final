var express = require("express");
var bodyParser = require("body-parser");
var db = require("./config/db");
var staticRoutes = require("./routes/static_routes");
var peopleRouter = require("./routes/people_router");
var thingsRouter = require("./routes/things_router");
var sessionsRouter = require("./routes/sessions_router");

db.connect("mongodb://localhost", function(){
  console.log("connected"); 
});

var app = express();
app.locals.pretty = true;
app.set("view engine", "jade");
app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/prod"));
app.use(bodyParser.json());

var paths = ["/", "/people/:id?", "/things/:id?", "/login"];
staticRoutes.setUp(paths, app);

app.use("/api/people", peopleRouter);
app.use("/api/things", thingsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(3000);
