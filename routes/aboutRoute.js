const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const createMulter = require('../utils/multer');

// Multer instance for blog images
const { upload: uploadAbout } = createMulter('abouts');

// CRUD routes
router.post('/', uploadAbout.single('image'), aboutController.createAbout);
router.get('/', aboutController.getAllAbouts);
router.get('/active', aboutController.getActiveAbout);
router.get('/:id', aboutController.getAboutById);
router.put('/:id', uploadAbout.single('image'), aboutController.updateAbout);
router.delete('/:id', aboutController.deleteAbout);

// Special routes
router.patch('/:id/toggle-activation', aboutController.toggleAboutActivation);


module.exports = router;