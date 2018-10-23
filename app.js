import bodyParser from 'body-parser'
import UserRoute from './src/user/UserRoute'
import userAuthenticator from './src/utils/userAuthenticator'
import config from './config'
let dbConnector = require('./db/connector')
let express = require('express')
let app = express()
const compression = require('compression')
const session = require('express-session')
const cookieParser = require('cookie-parser')
dbConnector.connect()
app.use(compression())

app.use(cookieParser())

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  httpOnly: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})
app.use(userAuthenticator.authenticate)
app.use('/user', UserRoute)
app.get('/', (req, res) => {
  res.send('Welcome')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
