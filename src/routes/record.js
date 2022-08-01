const express = require('express')
var router = express()
const create = require('../controller/record')
const view = require('../controller/record')
const update = require('../controller/record')
const remove =  require('../controller/record')
const deleteByIds =  require('../controller/record')
const bodyparser = require('body-parser');

router.use(bodyparser.json())
router.post('/create',create.create)
router.get('/', view.view)
router.put('/update/:id',update.update)
router.delete('/delete/:id',remove.remove)
router.delete('/delete',deleteByIds.deleteByIds)
module.exports = router