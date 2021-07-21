const multer = require('multer')
const path = require('path')

const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true)
	} else {
		cb('Please upload only images.', false)
	}
}

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// cb(null, path.resolve(__dirname+'/resources/assets/uploads/'))
		cb(null, path.join(__dirname, '/../../resources/assets/upload/'))
		// cb(null, __dirname + '/resources/assets/upload/')
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-bezkoder-${file.originalname}`)
	},
})

var uploadFile = multer({ storage: storage, fileFilter: imageFilter })
module.exports = uploadFile
