const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const {checkIfLoggedIn} = require('./middleware/restricted')

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');
const UserRouter = require('./users/users-router');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users',UserRouter)
server.use('/api/jokes',checkIfLoggedIn, jokesRouter); // only logged-in users should have access!

server.get('/',function testIfServerUp(req,res){
    res.status(200).json({message:"Welcome to My Api"})
})
module.exports = server;
