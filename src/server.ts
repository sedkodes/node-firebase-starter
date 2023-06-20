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

// Initialize API Server
const express =     require("express");
const app =         express();
const cors =        require("cors");
const bodyParser =  require("body-parser");
const session =     require("express-session");

// Express settings
app.use(cors())
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true,
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '15mb'}))
app.use(morgan('combined'))

const port = process.env.PORT || 8081;
app.listen(port)
console.info(`Listening on : ${port}`)

// Initialize Routes 
import {  createUser, getUser, getAllusers } from './services/users'

// User Routes
app.post("/api/users", isAuthenticated, createUser)
app.get("/api/users", isAuthenticated, getUser)
// Admin APIs
app.post("/api/users/patch", isAdminAuthenticated, getAllusers)
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