const satuanRepo = require('../repository/satuanRepo')
const {check, validationResult} = require('express-validator')

module.exports ={
	async getAllSatuan(req, res) {
		try{
			const satuans = await satuanRepo.getAll(req,res)
			res.status(201).send(satuans)
		}catch(e){
			console.log(e)
			res.status(500).send(e)
		}
	},

	async create(req, res){
		await check('name','satuan is required!').notEmpty().run(req)
		const result = validationResult(req)
		if (!result.isEmpty()) {
			return res.status(400).json({ errors: result.array() })
		}
		try {
			const satuans = await satuanRepo.createSatuan(req,res)
			res.status(200).send({
				status:'success',
				message:'satuan created successfully!',
				data:satuans
			})
			return satuans
		} catch (error) {
			res.status(500).send({
				message:
                error.message || 'Some error occurred while creating the satuan!'
			})
		}
	},

	async update(req, res){
		await check('name','satuan is required!').notEmpty().run(req)
		const result = validationResult(req)
		if (!result.isEmpty()) {
			return res.status(400).json({ errors: result.array() })
		}
		try {
			await satuanRepo.updateSatuan(req,res)
			res.status(200).send({message:'satuan updated successfully!'})
		} catch (error) {
			res.status(500).send({
				message:
                error.message || 'Some error occurred while update the satuan!'
			})
		}
	},

	async delete(req, res){
		try {
			await satuanRepo.deleteSatuan(req,res)
			res.status(200).send({message:'satuan deleted successfully!'})
		} catch (error) {
			res.status(500).send({
				message:
                error.message || 'Some error occurred while update the satuan!'
			})
		}
	}
    
}
