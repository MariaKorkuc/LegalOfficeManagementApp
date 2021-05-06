// constexpress = require('express');
// constapp = express();
// constport = 3000;
// app.get('/', (req, res) => res.send('Hello World! '));
// app.listen(port, () => console.log('Example app listening on port '+port));

var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Case = require('./API/models/caseModel'),
  User = require('./API/models/userModel'),
  Document = require('./API/models/documentModel'),
  SentenceAppeal = require('./API/models/sentenceappealModel'),
  Client = require('./API/models/clientModel'),
  Judge = require('./API/models/judgeModel'),
  LegalEntities = require('./API/models/legalEntityModel'),
  ContactDetails = require('./API/models/contactDetailsModel'),
  Appointments = require('./API/models/appointmentModel'),
  bodyParser = require('body-parser');


var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "LegalOfficeManagement";
var mongoDBURI = "mongodb://" + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;


mongoose.set('useCreateIndex', true); //removes a deprecation warning
mongoose.connect(mongoDBURI, {
    //reconnectTries: 10,
    //reconnectInterval: 500,
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routesCases = require('./API/routes/caseRoutes');
var routesUsers = require('./API/routes/userRoutes');
var routesDocuments = require('./API/routes/documentRoutes');
var routesSa = require('./API/routes/sentenceappealRoutes');
var routesClients = require('./API/routes/clientRoutes');
var routesJudges = require('./API/routes/judgeRoutes');
var routesLegalEntities = require('./API/routes/legalEntityRoutes');
var routesContactDetails = require('./API/routes/contactDetailsRoutes');
var routesAppointmentRoutes = require('./API/routes/appointmentRoutes');

routesCases(app);
routesUsers(app);
routesDocuments(app);
routesSa(app);
routesClients(app);
routesJudges(app);
routesLegalEntities(app);
routesContactDetails(app);
routesAppointmentRoutes(app);

console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function (err, conn) {
    app.listen(port, function () {
        console.log('Legal office management RESTful API server started on the port number: ' + port);
    });
});

mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
});
