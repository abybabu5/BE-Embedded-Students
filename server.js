const express = require ("express");
var cors = require('cors');

const listEndpoints = require("express-list-endpoints");
const path = require ("path");
const mongoose = require ("mongoose");

const projectsRouter = require("./src/services/projects/projects");
const studentsRouter = require("./src/services/students/students");

const LoggerMiddleware = (req, res, next) => {
    console.log(`${req.url} ${req.method} -- ${new Date()}`);
    next();
};
const requireJSONContentOnlyMiddleware = () => {
    return (req, res, next) => {
        if (req.headers["content-type"] !== "application/json") {
            res
                .status(400)
                .send("Server requires application/json only as content type");
        } else {
            next();
        }
    };
};

const server = express(); // Create http server with express
const port = 9000;/// process.env.PORT;

server.use(LoggerMiddleware);
server.use(express.json()); // To parse request bodies into objects
server.use(cors());
server.use("/projects", projectsRouter); // Each request on http://localhost:3000/projects is handled by projectsRouter
server.use("/students", studentsRouter);

// catch not found errors
server.use((err, req, res, next) => {
    if (err.httpStatusCode === 404) {
        console.log(err);
        res.status(404).send("Resource not found!");
    }
    next(err);
});
// catch not found errors
server.use((err, req, res, next) => {
    if (err.httpStatusCode === 401) {
        console.log(err);
        res.status(401).send("Unauthorized!");
    }
    next(err);
});
// catch forbidden errors
server.use((err, req, res, next) => {
    if (err.httpStatusCode === 403) {
        console.log(err);
        res.status(403).send("Operation Forbidden");
    }
    next(err);
});
// catch all
server.use((err, req, res, next) => {
    if (!res.headersSent) {
        res.status(err.httpStatusCode || 500).send(err);
    }
});

console.log(listEndpoints(server));

mongoose
    .connect("mongodb://localhost:27017/strivestudent", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
            console.log("MongoDB connected.");
            server.listen(port, () => {
                // Server run and listen to connections on port 3000
                console.log(`Server is running on port ${port}`);
            })
        }
    )
    .catch(err => console.log(err));