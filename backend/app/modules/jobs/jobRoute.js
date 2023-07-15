const express = require('express');
const JobController = require('./jobController');
const router = express.Router();


router.get('/', JobController.getJobList);
router.get('/:jobId', JobController.getJobDetail);

module.exports = router;