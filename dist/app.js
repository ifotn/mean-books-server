"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
// our own mvc file imports
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const user_1 = __importDefault(require("./models/user"));
// create & start new express app
const app = (0, express_1.default)();
// app config
app.use(body_parser_1.default.json());
// db connection
mongoose_1.default.connect(process.env.DB, {})
    .then((response) => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`Connection Error: ${error}`));
// cors config to grant access to angular client
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
}));
// passport config
app.use(passport_1.default.initialize());
// tell passport which model is handling authentication
passport_1.default.use(user_1.default.createStrategy());
// link User model w/passport session mgmt of user data
// serialize => write user to session
// deserialize => read user from session
passport_1.default.serializeUser(user_1.default.serializeUser());
passport_1.default.deserializeUser(user_1.default.deserializeUser());
// swagger config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MEAN Books API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js'] // location of yaml comments describing each method
};
// create new swagger doc 
const openApiSpecs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve);
app.get('/api-docs', (req, res) => {
    const html = swagger_ui_express_1.default.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
    res.send(html);
});
app.listen(4000, () => { console.log('Express API running on port 4000'); });
// map url's based on resource names to corresponding routers
app.use('/api/v1/books', booksRoutes_1.default);
app.use('/api/v1/users', usersRoutes_1.default);
