const Contact = require('../models/contact')
const express= require('express')
//const _=require('lodash')

module.exports.list = (req, res) => {
    Contact.find({user:req.user._id})
        .then((contacts) => {
            res.json(contacts)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    //console.log(req.body)
    const body  = req.body
    const contact = new Contact(body)
    //console.log(contact)
    contact.user = req.user._id
    contact.save()
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id 
    Contact.findOne({_id: id, user: req.user._id})
        .then((contact) => {
            if(contact) { 
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id 
    const body = req.body
    //const body  = _.pick(req.body,['name','email','mobile','category'])
    Contact.findOneAndUpdate({_id: id, user: req.user._id }, body, { new: true, runValidators: true })
        .then((contact) => {
            if(contact) {
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id 
    Contact.findOneAndDelete({_id: id, user: req.user._id})
        .then((contact) => {
            if(contact) {
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

// //register
// module.exports.create = (req, res)=>{
//     const body = req.body
//     const user = new User(body)
//     user.save()
//         .then(user=>{
//             res.json(user)
//         })
//         .catch(err=>{
//             res.json(err)
//         })
// }

// //login
// module.exports.login = (req, res)=>{
//     const body = req.body
//     User.findByCredentials(body.email, body.password)
//         .then(user=>{
//             user.generateToken()
//                 .then(token=>{
//                     res.setHeader('x-auth', token).send('Login done successfully')
//                 })
//                 .catch(err=>{
//                     res.json(err)
//                 })
//         })
//         .catch(err=>{
//             res.json(err)
//         })
// }

// //logout
// module.exports.logout = (req, res)=>{
//     const body = req.body
//     User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
//         .then(user=>{
//             user.generateToken()
//                 .then(token=>{
//                     res.setHeader('x-auth', token).send('Logged out successfully')
//                 })
//                 .catch(err=>{
//                     res.json(err)
//                 })
//         })
//         .catch(err=>{
//             res.json(err)
//         })
// }