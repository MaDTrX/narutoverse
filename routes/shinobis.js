var express = require('express');
var router = express.Router();
const shinobisCtrl = require('../shinobis')
const isLoggedIn = require('../config/auth');

const multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
		
	}
});


var upload = multer({ storage: storage });



/* GET users listing. */
router.get('/', shinobisCtrl.index)
router.get('/new', isLoggedIn, shinobisCtrl.new)
router.get('/:id', isLoggedIn, shinobisCtrl.show)
router.post('/', isLoggedIn, upload.single('img'), shinobisCtrl.create)
router.get('/:id/edit', isLoggedIn, shinobisCtrl.edit);
router.put('/:id', isLoggedIn, shinobisCtrl.update);

module.exports = router;
