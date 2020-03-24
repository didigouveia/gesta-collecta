const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const GesturesController = require('../controllers/gestures');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(GesturesController.index)
    .post(validateBody(schemas.gestureSchema), GesturesController.newGesture);

router.route('/:gestureId')
    .get(validateParam(schemas.idSchema, 'gestureId'), GesturesController.getGesture);

module.exports = router;