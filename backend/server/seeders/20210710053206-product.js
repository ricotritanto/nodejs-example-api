'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('products', [{
        barcode:'BRG0001',
        serial: 'sn00001',
        product_name: 'hdd seagate',
        slug:'hdd-seagate',
        category_id:'1',
        satuan_id:'1',
        harga_beli: '1000',
        harga_jual:'2000',
        stok:'1',
        type:'jpg',
        image_name:'test upload image',
        data_image:'',
        description:'test',
        status:'1'
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('products', null, {});
  }
};