const express = require('express')
const app = express();
require('dotenv').config()
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const Router = require('./routes/authroute')
const postRouter = require('./routes/postroute')
const mongooseConnection = require('./connection/mongodb');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

Sentry.init({
  dsn:process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

mongooseConnection()
app.get('/',(req,res)=>{
    res.send(`Connected to server on Portno :${PORT}`)
})

app.use('/api',Router)
app.use('/api/post',postRouter)


const PORT = process.env.PORT || 8080
app.listen(PORT,(err,res)=>{
    if(err) throw error;
   
    console.log(`Connected to server on Portno :${PORT}`)

})
