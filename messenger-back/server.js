import express from 'express'
import session from 'express-session'
import registrationRoute from './routes/registrationRoute.js'
import loginRoute from './routes/loginRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import sessionRoute from './routes/sessionRoute.js'

const port = 8000

const app = express()

app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use('/', registrationRoute)
app.use('/', loginRoute)
app.use('/', logoutRoute)
app.use('/', sessionRoute)

app.listen(port, () => console.log(`Server is running on port ${port}`))
