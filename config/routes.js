const express = require('express')
const router = express.Router()

const contactsController = require('../app/controllers/contactsController')
const usersController = require('../app/controllers/userController')
const authenticateUser = require('../app/middlewares/Authentication')

router.get('/contacts', authenticateUser, contactsController.list)
router.post('/contacts', authenticateUser, contactsController.create)
router.get('/contacts/:id', authenticateUser, contactsController.show)
router.put('/contacts/:id', authenticateUser, contactsController.update)
router.delete('/contacts/:id', authenticateUser, contactsController.destroy)

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
//router.get('/users/all',  usersController.all)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)
//router.delete('/users/logoutAll', authenticateUser, usersController.destroyAll)

module.exports = router