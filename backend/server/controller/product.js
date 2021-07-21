// const productModels = require("../models/index")
const productRepo = require('../repository/productRepo')
const {check, validationResult} = require('express-validator')
// const uploadFile = require("../middleware/upload");

module.exports ={
	async getAll(req, res) {
		const products = await productRepo.getAllProduct(req,res)
		res.status(200).send(products)
	},

	async create(req, res){
		// console.log(req.body)
		console.log(req.file)        
		try {
			if (req.file == undefined) {
				return res.send('You must select a file.')
			}
			var serialnya = req.body.serial
			console.log(serialnya)
			await check('serial','serial is required!').notEmpty().run(req)
			// await check('product_name','product is required!').notEmpty().run(req)
			// await check('category_id','category is required!').notEmpty().run(req)
			// await check('satuan_id','satuan is required!').notEmpty().run(req)
			// await check('harga_beli','harga beli is required!').notEmpty().run(req)
			// await check('harga_jual','harga jual is required!').notEmpty().run(req)
			// await check('stok','stok is required!').notEmpty().run(req)
			// await check('status','status is required!').notEmpty().run(req)
                
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array()})
			}

			var getserial = await productRepo.getSerial(req,res)
			console.log(getserial)
			if(getserial == null){
				await productRepo.createProduct(req, res)
				// res.status(200).end('Product created successfully!')
				res.status(200).send({message:'Product created successfully!'})
			}else if(serialnya.toLowerCase() == getserial.serial.toLowerCase()){
				res.status(409).json('Serial Number already exist!')
			}    
		} catch (error) {
			res.status(500).send({
				message:
                error.message || 'Some error occurred while creating the category!'
			})
		}
        
	},

	async update(req, res){
		// var serialnya = req.body.serial;
		await check('serial','serial is required!').notEmpty().run(req)
		await check('product_name','product is required!').notEmpty().run(req)
		await check('category_id','category is required!').notEmpty().run(req)
		await check('satuan_id','satuan is required!').notEmpty().run(req)
		await check('harga_beli','harga beli is required!').notEmpty().run(req)
		await check('harga_jual','harga jual is required!').notEmpty().run(req)
		await check('stok','stok is required!').notEmpty().run(req)
		await check('status','status is required!').notEmpty().run(req)
            
		const result = validationResult(req).array()		
		if (!result.isEmpty()) {
			return res.status(400).json({errors:result.array()})
		}
		try {
			await productRepo.updateProduct(req, res)
			res.status(200).send({message:'Product updated successfully!'})
		} catch (error) {
			res.status(500).send({
				message:'Some error occurred!!'
			})
		}
	},

	async delete(req, res){
		try {    
			await productRepo.deleteProducts(req, res)
			res.status(201).send({message:'Product deleted successfully!'})
		} catch (error) {
			console.log(error)
			res.status(500).send({
				message:error.message || 'something wrong!'
			})
		}
	}
    
}
