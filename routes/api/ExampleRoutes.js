const express = require('express');
const router = express.Router();
const CupApiController = require('../../controllers/api/v1/cup.js');

/*
 * GET CDP Samples
 */
router.get('/fees', CupApiController.cdpFees);

/*
 * GET CDP acts
 */
router.get('/:id/acts', CupApiController.cupAct);

/*
 * GET CDP Individual stats
 */
router.get('/:id', CupApiController.cup);

/*
 * GET CDP Individual stats
 */
router.get('/:id', CupApiController.cup);

/*
 * GET CDP Samples
 */
router.get('/', CupApiController.cupsSample);

module.exports = router;