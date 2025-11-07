const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const createMulter = require('../utils/multer');

// Multer instance for blog images
const { upload: uploadservice } = createMulter('services');


// CRUD routes
router.post('/', uploadservice.single('image'), serviceController.createService);
router.get('/', uploadservice.single('image'), serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;