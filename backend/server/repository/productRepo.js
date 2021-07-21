var fs = require('fs')
const productModels = require('../models/index')
const satuanModels = require('../models/index')
const categoryModels = require('../models/index')
// const path = require('path')

const { v4: uuidv4 } = require('uuid')
// const { combineTableNames } = require('sequelize/types/lib/utils')

module.exports = {
	async getAllProduct() {
		return await productModels.product.findAll({
			include: [
				{
					model:satuanModels.satuan
				},
				{
					model:categoryModels.category
				}
			]
		})
	},

	async createProduct(req){
		let generateBarcode = uuidv4()
		return await productModels.product.create({
			serial:req.body.serial,
			product_name:req.body.product_name,
			slug:req.body.product_name,
			category_id:req.body.category_id,
			satuan_id:req.body.satuan_id,
			harga_beli:req.body.harga_beli,
			harga_jual:req.body.harga_jual,
			stok:req.body.stok,        
			type: req.file.mimetype,
			image_name: req.file.originalname,
			data_image: fs.readFileSync(
				__dirname + '/../../resources/assets/upload/' + req.file.filename
			),
			description:req.body.description,
			barcode:generateBarcode,
			status:req.body.status,
		}).then((image) => {
			fs.writeFileSync(
				__dirname + '/../../resources/assets/tmp/' + image.name,
				image.data_image
			)
		})
            
	},

	async deleteProducts(req){
		return await productModels.product.destroy({
			where: { id: req.params.id}
		})
	},

	async getSerial(req){
		// return await
		const seriale = await productModels.product.findOne({
			where: {serial:req.body.serial}
		})
		return seriale
	},

	async updateProduct(req){
		return  await productModels.product.update({
			serial:req.body.serial,
			product_name:req.body.product_name,
			slug:req.body.product_name,
			category_id:req.body.category_id,
			satuan_id:req.body.satuan_id,
			harga_beli:req.body.harga_beli,
			harga_jual:req.body.harga_jual,
			stok:req.body.stok,
			image:req.body.image,
			description:req.body.description,
			barcode:req.body.barcode,
			status:req.body.status},
		{
			where: { id: req.params.id}
		})
	}

}