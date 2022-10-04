// import sante api 
const controller=require('../Controller/controller')


// router
const router = require('express').Router()


// use routers
router.post('/userAuth', controller.userAuthentication)

router.post('/postResource', controller.POST)

router.get('/:url', controller.GET)

router.put('/updateResource', controller.PUT)


module.exports = router