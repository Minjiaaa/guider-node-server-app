import express from 'express';
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import MongoStore from 'connect-mongo'
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING

const app = express();
app.set("trust proxy", 1);
app.use(
    session({
        secret: "any string",
        resave: false,
        proxy: true,
        saveUninitialized: false,
        cookie: {
            sameSite: "none",
            secure: true,
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
const port = process.env.PORT || 4000;
UserController(app);
AuthController(app);
TuitsController(app);
app.listen(port);