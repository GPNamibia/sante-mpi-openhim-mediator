// import sante api 
const controller=require('../Controller/controller')

// router
const router = require('express').Router()

// use routers
router.post('/userAuth', controller.userAuthentication)

router.post('/postResource', controller.POST)

router.post('/merge', controller.merge)

router.get('/getResource?:url', controller.GET)

router.get('/getSimiliar/:id', controller.getSimilar)

router.put('/updateResource/:id', controller.PUT)

module.exports = router