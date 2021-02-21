const { route } = require('../auth/auth-router');
const Users = require('./users-model');
const router = require('express').Router();


router.get('/',function getUsers(req,res){
    Users.find()
    .then((users)=>{
        res.status(200).json(users)
    })
    .catch((err)=>{
        res.status(500).json({error:err.message})
    })
})

router.get('/:id', function getUserById(req,res){
    const {id} = req.params;
    Users.findById(id)
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch((err)=>{
        res.status(200).json({error:err.message})
    })
})

module.exports = router;