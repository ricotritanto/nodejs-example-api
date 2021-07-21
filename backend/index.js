const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Routes = require('./server/routes/index')
// const db = require('./server/models/')
// const multer = require('multer')
const path = require('path')
global.__basedir = __dirname

// var multere = multer()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// app.use(multere.array())   //digunakan untuk post in postman using form-data

//set static assets to directory
app.use(express.static(path.join(__dirname,'resources')))
Routes(app)
// app.use(express.static(path.join(__dirname,'resources')))
// enable files upload
// app.use(fileUpload({
//   createParentPath: true
// }));


// const run = async () => {

// }

// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.')
// 	run()
// })

const server = require('http').createServer(app) 
const PORT = process.env.PORT || process.env.APP_PORT || 3000
if (!module.parent) {
	server.listen(PORT, () => {
		console.log('Express Server Now Running. port:'+PORT)
	})
}
module.exports = app