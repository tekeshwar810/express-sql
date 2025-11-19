const express = require('express');
const router = express.Router();
const companeyController = require("../controllers/companey");
const upload = require("../middlewares/imageUpload");
const fileUpload = require("../middlewares/fileUpload");
const validate = require("../middlewares/validate");
const { authenticate } = require("../middlewares/authentication");
const { addCompaneyValidation, updateCompaneyValidation } = require("../validations/companey.validation")

router.route('/')
    .post(authenticate, upload.multiImageUpload("images"), validate(addCompaneyValidation), companeyController.addCompaney)
    .get(authenticate, companeyController.getAllCompaney);

router.route('/:id')    
        .get(authenticate, companeyController.getCompaney)
    
router.route('/:id')    
    .put(authenticate, upload.multiImageUpload("images"), validate(updateCompaneyValidation), companeyController.updateCompaney)

router.route('/:id')    
    .delete(authenticate, companeyController.deleteCompaney)

// File upload route
router.post('/:id/upload-file', authenticate, fileUpload.singleFileUpload('file'), companeyController.uploadFile);

// Image uplode...

router.post('/:id/upload-images', authenticate,
    upload.multiImageUpload('images'), 
    companeyController.uploadImages);

module.exports = router;
