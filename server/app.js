require('dotenv').config();
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors')
const port = 5000;
const SigninRoutes = require('./routers/SigninRoutes')
const LogInRoutes = require('./routers/LogInRoutes')
const LogoutRoute = require('./routers/LogoutRoute')
const RecipeRoutes = require('./routers/RecipeRoutes')
const {connectionWithAtlas} = require('./configrations/database')
const {isAutorized} = require('./middlewares/middlewareForAuthentication');
const { controllerForPerosnalProfile } = require('./controllers/controllerForProfile');
app.use(cors({
    origin : 'http://localhost:3000',
    methods: ['POST', 'GET', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept'],
    credentials: true,
}));

app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true,
    }))
app.use(cookieparser());

app.get('/', (req, res) => {
    res.send("I am MAIN Route")
})

app.get('/check/authorization', isAutorized, controllerForPerosnalProfile)
app.use('/login', LogInRoutes);
app.use('/signin', SigninRoutes);
app.use('/recipe' , RecipeRoutes)
app.use('/logout', LogoutRoute);

const httpSever = app.listen(port, () => {
    console.log(`Connnected with express server ${port}`)
    connectionWithAtlas()
})