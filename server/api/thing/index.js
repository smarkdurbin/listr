'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/:listId', controller.indexByList);
router.get('/', controller.showAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;