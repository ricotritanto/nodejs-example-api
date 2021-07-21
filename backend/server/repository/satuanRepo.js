const satuanModels = require('../models/index')

module.exports = {
	// get all data
	async getAll(){
		return await satuanModels.satuan.findAll()
	},

	async createSatuan(req){
		return await satuanModels.satuan.create({
			name:req.body.name,
			slug:req.body.name
		})
	},
    
	async updateSatuan(req) {
		return await satuanModels.satuan.update({
			name:req.body.name,
			slug:req.body.name},{
			where:{
				id:req.params.id
			}
		})
	},

	async deleteSatuan(req) {
		return await satuanModels.satuan.destroy({
			where: { id: req.params.id}
		})
	}
}