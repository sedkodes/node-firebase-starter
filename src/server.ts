require("dotenv").config()
var morgan = require('morgan')

import { isAdminAuthenticated, isAuthenticated } from './middleware/auth';
import * as admin from 'firebase-admin';

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECTID,
    "privateKey": Buffer.from(process.env.FIREBASE_PRIVATEKEY_B64 , 'base64').toString('ascii'),
    "clientEmail": process.env.FIREBASE_CLIENTEMAIL
  })
});

// Start the broker event listener
// require('./orders-event-listener')

// Setup API Server
const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const session = require("express-session");

app.use(cors())
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true,
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({
  limit: '15mb'
}))
app.use(morgan('combined'))

// Setup Routes 
import * as users from './users'
const cronjobs = require('./cronjob')

// User Routes
app.post("/api/users", isAuthenticated, users.createUser)
app.get("/api/users", isAuthenticated, users.getUser)

// Admin APIs
app.post("/api/admin/cronjob", isAdminAuthenticated, cronjobs.createCronjob)

// Health Check
app.get("/api/health", (_req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
    release: process.env.RELEASE
  }

  res.status(200).send(data);
});

const port = process.env.PORT || 8081;
app.listen(port)

console.info(`Listening on : ${port}`)

