// npm imports
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import cookieParser from 'cookie-parser';

// our own mvc file imports
import booksRoutes from './routes/booksRoutes';
import usersRoutes from './routes/usersRoutes';
import User from './models/user';

// create & start new express app
const app: Application = express();

// app config
app.use(bodyParser.json());
app.use(cookieParser());  // to use cookies for jwt

// db connection
mongoose.connect(process.env.DB, {})
.then((response) => console.log('Connected to MongoDB'))
.catch((error) => console.log(`Connection Error: ${error}`));

// cors config to grant access to angular client
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
}));

// passport config
app.use(passport.initialize());

// tell passport which model is handling authentication
passport.use(User.createStrategy());

// link User model w/passport session mgmt of user data
// serialize => write user to session
// deserialize => read user from session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// jwt config, using random string for hashing
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
};

const strategy = new Strategy(jwtOptions, async (jwtPayload, callback) => {
    // before creating jwt, validate user so we can store user data in token
    try {
        const user = await User.findById(jwtPayload.id);

        // user not found => error
        if (!user) throw new Error('Unauthorized');

        // user found, return user, no error
        return callback(null, user);
    }
    catch (error) {
        // user not found, return error, no user
        return callback(error, null);
    }
});

passport.use(strategy);

// swagger config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MEAN Books API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js']  // location of yaml comments describing each method
};

// create new swagger doc 
const openApiSpecs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve);

app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
    res.send(html);
});

app.listen(4000, () => { console.log('Express API running on port 4000') });

// map url's based on resource names to corresponding routers
app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/users', usersRoutes);