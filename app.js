const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');


require('./API/models/caseModel');
require('./API/models/userModel');

require('./API/models/clientModel');
require('./API/models/legalEntityModel');

require('./API/models/documentModel');
require('./API/models/appointmentModel');


const mongoDBUser = process.env.user || "legalAdmin";
const mongoDBPass = process.env.pass || "UWMVD2SkPx1maUfWRvNk";

const mongoDBHostname = process.env.mongoDBHostname || "localhost";
const mongoDBPort = process.env.mongoDBPort || "27017";
const mongoDBName = process.env.mongoDBName || "LegalOfficeManagement";
const mongoDBURI = "mongodb://" + mongoDBUser + ":" + mongoDBPass + "@" + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;


mongoose.set('useCreateIndex', true); //removes a deprecation warning
mongoose.connect(mongoDBURI, {
    // reconnectTries: 3,
    // reconnectInterval: 300,
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const app = express();
const port = process.env.PORT || 8080;

app.set('port', port);

app.use(morgan('dev'));

app.use(fileUpload({
    createParentPath: true,
    useTempFiles : true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: '/tmp/'
}));

app.use('/download', express.static('/tmp'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['UWMVD2SkPx1maUfWRvNk'],
    maxAge: 1000 * 60 * 60 * 24 //24h valid session
}));


var routesCases = require('./API/routes/caseRoutes');
var routesUsers = require('./API/routes/userRoutes');
var routesDocuments = require('./API/routes/documentRoutes');
var routesSa = require('./API/routes/sentenceappealRoutes');
var routesClients = require('./API/routes/clientRoutes');
var routesJudges = require('./API/routes/judgeRoutes');
var routesLegalEntities = require('./API/routes/legalEntityRoutes');
var routesContactDetails = require('./API/routes/contactDetailsRoutes');
var routesAppointmentRoutes = require('./API/routes/appointmentRoutes');

const { authRoutes } = require('./API/routes/authRoutes');
const { authMiddleware } = require('./API/middleware/authMiddleware');


authRoutes(app);

// auth middleware 
app.use(authMiddleware);

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
