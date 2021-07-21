const categoryModels = require('../models/index')

module.exports = {
	// get all data
	async getAll(){
		return await categoryModels.category.findAll()
	},

	async createCategory(req){
		return await categoryModels.category.create({
			category_name:req.body.category_name,
			slug:req.body.category_name
		})
	},
    
	async updateCategory(req) {
		return await categoryModels.category.update({
			category_name:req.body.category_name,
			slug:req.body.category_name},{
			where:{
				id:req.params.id
			}
		})
	},

	async deleteCategory(req) {
		return await categoryModels.category.destroy({
			where: { id: req.params.id}
		})
	}
}