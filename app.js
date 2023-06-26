import express from 'express';
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import sessions from "express-session";
import MongoStore from 'connect-mongo'
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
console.log(CONNECTION_STRING)
const oneDay = 1000 * 60 * 60 * 24;

const app = express();
app.set("trust proxy", 1);
app.use(
    sessions({
        secret: "any string",
        resave: false,
        proxy: true,
        saveUninitialized: false,
        // saveUninitialized: true,
        cookie: {
            sameSite: "none",
            secure: false,
            maxAge: oneDay,
        },
        store: MongoStore.create({
            clientPromise: mongoose.connect(CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(m => m.connection.getClient()),
        })
    })
);

app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:3000", "https://taupe-churros-eca8b0.netlify.app", "https://main--taupe-churros-eca8b0.netlify.app", "https://angel--taupe-churros-eca8b0.netlify.app"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname));

const port = process.env.PORT || 4000;
UserController(app);
AuthController(app);
TuitsController(app);
app.listen(port);