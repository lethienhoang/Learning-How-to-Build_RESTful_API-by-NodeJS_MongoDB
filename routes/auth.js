const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');
const Joi = require('joi');
const config = require('config');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

   const validPassword = bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send('Invalid email or password.'); 

   const token =  user.generateAuthToken(); 
   res.header('x-auth-token', token).send(token);
});


function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

module.exports = router;