const satuanController = require('../controller/satuan')
const categoryController = require('../controller/category')
const productController = require('../controller/product')
const uploads = require('../middleware/upload')

module.exports = app =>{
	app.get('/api', (req, res) => {
		res.status(200).send({
			data: 'Selamat Datang di API V1 Amazing-CORP',
		})
	})

	// route untuk satuan
	app.get('/api/satuan', satuanController.getAllSatuan)
	app.post('/api/satuan', satuanController.create)
	app.put('/api/satuan/:id', satuanController.update)
	app.delete('/api/satuan/:id', satuanController.delete)
    
    
	// route untuk category
	app.get('/api/category', categoryController.getAllCategory)
	app.post('/api/category', categoryController.create)
	app.put('/api/category/:id', categoryController.update)
	app.delete('/api/category/:id', categoryController.delete)

	// route untuk products
	app.get('/api/products', productController.getAll)
	app.post('/api/products', uploads.single('image'),productController.create)
	app.put('/api/products/:id', productController.update)
	app.delete('/api/products/:id', productController.delete)
	// app.get('/api/products/:barcode',productController.getByBarcode)
}
