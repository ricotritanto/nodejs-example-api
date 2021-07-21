const categoryRepo = require('../repository/categoryRepo')
const {check, validationResult} = require('express-validator')

module.exports ={
	async getAllCategory(req, res) {
		try{
			const categorys = await categoryRepo.getAll(req,res)
			res.status(201).send(categorys)
		}catch(e){
			console.log(e)
			res.status(500).send(e)
		}
	},

	async create(req, res){
		await check('category_name','category is required!').notEmpty().run(req)
		const result = validationResult(req)
		if (!result.isEmpty()) {
			return res.status(400).json({ errors: result.array() })
		}
		try {
			await categoryRepo.createCategory(req,res)
			res.status(200).send({message:'Category created successfully!'})
		} catch (error) {
			res.status(500).send({
				message:
                error.message || 'Some error occurred while creating the category!'
			})
		}
	},

	async update(req, res){
		await check('category_name','category is required!').notEmpty().run(req)
		const result = validationResult(req)
		if (!result.isEmpty()) {
			return res.status(400).json({ errors: result.array() })
		}
		try {
			await categoryRepo.updateCategory(req)
			res.status(200).send({message:'Category updated successfully!'})
		} catch (error) {
			res.status(500).send({
				message:
                error.message || 'Some error occurred while update the category!'
			})
		}
	},

	async delete(req, res){
		try {
			await categoryRepo.deleteCategory(req,res)
			res.status(201).send({message:'category deleted successfully!'})
		} catch (error) {
			res.status(500).send({
				message:
                error.message || 'Some error occurred while update the satuan!'
			})
		}
	}
    
}
