import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import registrationRoute from './routes/registrationRoute.js'
import loginRoute from './routes/loginRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import sessionRoute from './routes/sessionRoute.js'

const app = express()

app.use(express.json())

const sessionStore = MongoStore.create({
    mongoUrl: process.env.mongo_url,
    ttl: 24*60*60,
    crypto: {
        secret: process.env.session_secret
    },
})

app.use(session({
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24*60*60*1000, sameSite: true, httpOnly: true },
    store: sessionStore
}))

app.use('/', registrationRoute)
app.use('/', loginRoute)
app.use('/', logoutRoute)
app.use('/', sessionRoute)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
