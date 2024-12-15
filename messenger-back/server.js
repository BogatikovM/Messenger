import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import helmet from 'helmet'
import registrationRoute from './routes/registrationRoute.js'
import loginRoute from './routes/loginRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import sessionRoute from './routes/sessionRoute.js'
import chatAddingRoute from './routes/chatAddingRoute.js'
import chatsGetRoute from './routes/chatsGetRoute.js'
import chatSendRoute from './routes/chatSendRoute.js'
import messagesGetRoute from './routes/messagesGetRoute.js'
import chatGetRoute from './routes/chatGetRoute.js'
import memberAddingRoute from './routes/memberAddingRoute.js'
import userGetRoute from './routes/userGetRoute.js'
import userInfoUpdateRoute from "./routes/userInfoUpdateRoute.js"
import userPasswordUpdateRoute from "./routes/userPasswordUpdateRoute.js"
import memberDeleteRoute from './routes/memberDeleteRoute copy.js'
import memberPromoteRoute from './routes/memberPromoteRoute.js'
import memberDemoteRoute from './routes/memberDemoteRoute.js'
import chatLeaveRoute from './routes/chatLeaveRoute.js'
import messageDeleteRoute from './routes/messageDeleteRoute.js'
import messageUpdateRoute from './routes/messageUpdateRoute.js'

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

app.use(function(req, res, next){
    if ((req.url == "/" || req.url == "/profile") && (!req.session || !req.session.user)){
        return res.status(403).send({ "result": "fail", "message": "not permitted" })
    } else {
        next()
    }
})

const rateLimiter = new RateLimiterMemory({
    points: 10,
    duration:1,
})

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next()
        })
        .catch(() => {
            res.status(429).send('Too Many Requests')
        })
}

app.use(rateLimiterMiddleware)

app.use(helmet())

app.use('/', registrationRoute)
app.use('/', loginRoute)
app.use('/', logoutRoute)
app.use('/', sessionRoute)
app.use('/user', userGetRoute)
app.use('/user', userInfoUpdateRoute)
app.use('/user', userPasswordUpdateRoute)
app.use('/chat', chatAddingRoute)
app.use('/chat', chatsGetRoute)
app.use('/chat', chatSendRoute)
app.use('/chat', messagesGetRoute)
app.use('/chat', chatGetRoute)
app.use('/chat/user', memberAddingRoute)
app.use('/chat/user', memberDeleteRoute)
app.use('/chat/user', memberPromoteRoute)
app.use('/chat/user', memberDemoteRoute)
app.use('/chat/user', chatLeaveRoute)
app.use('/chat/message', messageDeleteRoute)
app.use('/chat/message', messageUpdateRoute)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
