import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import registrationRoute from './routes/registrationRoute.js'
import loginRoute from './routes/loginRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import sessionRoute from './routes/sessionRoute.js'
import chatAddingRoute from './routes/chatAddingRoute.js'
import chatsGetRoute from './routes/chatsGetRoute.js'
import chatSendRoute from './routes/chatSendRoute.js'
import messagesGetRoute from './routes/messagesGetRoute.js'
import chatGetRoute from './routes/chatGetRoute.js'

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
app.use('/chat', chatAddingRoute)
app.use('/chat', chatsGetRoute)
app.use('/chat', chatSendRoute)
app.use('/chat', messagesGetRoute)
app.use('/chat', chatGetRoute)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
