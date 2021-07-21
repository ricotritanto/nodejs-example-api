"use strict";
var uuid= ''
var TableHandler = function(){
    // load data product
    var LoadTableData = function(){
        var urle = "http://localhost:3000/api/products";
        $.getJSON(urle, function(data){
            // console.log(data)
            var tablenya = "";
            var no = 1;
            data.forEach((isinya) => {

                var newNo = no++;
                var attrStatus="";
                var statuse="";

                if(isinya.status == '1'){
                    attrStatus = 'label label-lg label-primary label-md font-weight-bold label-inline'
                    statuse = 'Publish'
                }else{
                    attrStatus = 'label label-lg label-warning label-md font-weight-bold label-inline'  
                    statuse = 'Draft' 
                }
                tablenya +='<tr>';
                tablenya +='<td>'+newNo+'</td>';
                tablenya +='<td>'+isinya.serial+'</td>';
                tablenya +='<td>'+isinya.product_name+'</td>';
                tablenya +='<td>'+((isinya.category_id==null)?'-':isinya.category.category_name)+'</td>';                
                tablenya +='<td>'+((isinya.satuan_id==null)?'-':isinya.satuan.name)+'</td>';
                tablenya +='<td>'+isinya.harga_beli+'</td>';
                tablenya +='<td>'+isinya.harga_jual+'</td>';
                tablenya +='<td>'+isinya.stok+'</td>';
                tablenya +='<td>'+isinya.image+'</td>';
                tablenya +='<td>'+isinya.description+'</td>';
                tablenya +='<td><span class="'+attrStatus+'">'+statuse+'</span></td>';
                tablenya +='<td>'+
                            '<a class="btn btn-primary" data-toggle="collapse" onclick="updateProducts('+isinya.id+',\''+isinya.serial+'\',\''+isinya.product_name+'\',\''+isinya.category_id+'\',\''+isinya.satuan_id+'\',\''+isinya.harga_beli+'\',\''+isinya.harga_jual+'\',\''+isinya.stok+'\',\''+isinya.description+'\',\''+isinya.image+'\',\''+isinya.status+'\',\''+isinya.barcode+'\')" aria-expanded="false" aria-controls="collapseExample">Update</a>'+
                            '<a class="btn btn-danger" data-toggle="collapse" onclick="deleteProducts('+isinya.id+')" role="button" aria-expanded="false" aria-controls="collapseExample">Delete</a>'+
                            '<a class="btn btn-warning" data-toggle="collapse" onclick="generateBarcode(\''+isinya.barcode+'\')" role="button" aria-expanded="false" aria-controls="collapseExample">Generate Barcode</a>'+
                            '</td>';
                tablenya +='</tr>';
            });
            $('#datane').html(tablenya);
            $('#btnUpdate').hide();
        })
    }

    var reRenderElement = function(element , stringHtml){
        element.empty();
        element.html(stringHtml);
        return element
    }

    var loadCategory = function(){
        $('#category').hide();
        $('#category').select2({
            placeholder: 'Select Category',
            width: '100%'
        });
        
        return $.get("http://localhost:3000/api/category", function(data, status){
            var optionsize = '<option value=""></option>';
            data.forEach(function(each){
                optionsize += '<option value="'+each.id+'">'+each.category_name+'</option>';
            })
            reRenderElement($('#category'), optionsize).show()
        }).fail(function(e) { 
            console.error('Failed To Fetch category Data')
            console.log(e)
        })
    }
    var loadStatus = function(){
        $('#status').hide();
        $('#status').select2({
            placeholder: 'Choose status',
            width: '100%'
        });        
    }
    
    var loadSatuan = function(){
        $('#satuan').hide();
        $('#satuan').select2({
            placeholder: 'Select Satuan',
            width: '100%'
        });
        
        return $.get("http://localhost:3000/api/satuan", function(data, status){
            var optionsize = '<option value=""></option>';
            data.forEach(function(each){
                // console.log(each)
                optionsize += '<option value="'+each.id+'">'+each.name+'</option>';
            })
            reRenderElement($('#satuan'), optionsize).show()
        }).fail(function(e) { 
            console.error('Failed To Fetch Satuan Data')
            console.log(e)
        })
          
    }

    return{
        init:function(){
            LoadTableData();
            loadCategory();
            loadSatuan();
            loadStatus();
        }
    }
}();


var editID = "";
var FormHandleSubmit = function(){
    $("#formProduct").validate({  //validation menggunakan validator dari jquery, 
        // rules: {
        //     serial: {
        //         required: true
        //     },
        //     product_name: {
        //         required: true
        //     },
        //     category: {
        //         required: true
        //     },
        //     satuan: {
        //         required: true
        //     },
        //     harga_beli: {
        //         required: true
        //     },
        //     harga_jual: {
        //         required: true
        //     },
        //     stok: {
        //         required: true
        //     },
        //     // description: {
        //     //     required: true
        //     // },
        //     image: {
        //         required: true
        //     },
        //     status:{
        //         required: true
        //     }
        // },
        submitHandler: function(form){ //untuk menghandle submit, setelah selesai di validasi datanya.
             // create product 
            $('#btnSave').on('click', function(e){
                e.preventDefault(); //berfungsi untuk mencegah bawaan terjadinya event bawaan dari dom saat diklik
                // var xhttp = new XMLHttpRequest();
                // xhttp.onreadystatechange = function() {
                //     if (this.readyState == 4 && this.status == 200) { // sucess from server
                //       document.getElementById("status").innerHTML = 'sent'+this.responseText+ xhttp.status;
                //     }else{ // errors occured
                //       document.getElementById("status").innerHTML = xhttp.status ;
                //     }
                //   }
                var data = new FormData();
                var files = $('#image')[0].files[0];
                var desc = $('#description').val();
                var serial = $('#serial').val();
                var product_name = $('#product_name').val();
                var category_id = $('#category').val();
                var satuan_id = $('#satuan').val();
                var harga_beli = $('#harga_beli').val();
                var harga_jual = $('#harga_jual').val();
                var stok = $('#stok').val();
                var status =  $('#status').val();
                data.append('image', files);
                data.append('description', desc);
                data.append('serial', serial);                
                // data.append('product_name', product_name);                
                // data.append('category', category_id);                
                // data.append('satuan', satuan_id);                
                // data.append('harga_beli', harga_beli);                
                // data.append('harga_jual', harga_jual);                
                // data.append('stok', stok);                
                // data.append('status', status);

                

                // data = {
                //         serial: $('#serial').val(),
                //         product_name: $('#product_name').val(),
                //         category_id: $('#category').val(),
                //         satuan_id: $('#satuan').val(),
                //         harga_beli: $('#harga_beli').val(),
                //         harga_jual: $('#harga_jual').val(),
                //         stok: $('#stok').val(),
                //         description: $('#description').val(),
                //         // image:('image',files),
                //         status: $('#status').val()
                //     }
                // console.log(data)

                $.ajax({
                    url: 'http://localhost:3000/api/products',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    method: 'POST',
                    type: 'POST', // For jQuery < 1.9
                    success: function(result){
                        Swal.fire({
                            position: 'center-end',
                            icon: 'success',
                            title: 'Your data has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        TableHandler.init();
                        resetForm();
                    },error: function(xhr,status,error){
                        // var abc=$.parseJSON(xhr.responseText)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            // text:xhr.responseText,
                            text: 'Something went wrong!',
                        })
                    }
                });
                // console.log(files.file)
                // var asw = $('#image')[0].files;
                // datanya = {
                //     serial: $('#serial').val(),
                //     product_name: $('#product_name').val(),
                //     category_id: $('#category').val(),
                //     satuan_id: $('#satuan').val(),
                //     harga_beli: $('#harga_beli').val(),
                //     harga_jual: $('#harga_jual').val(),
                //     stok: $('#stok').val(),
                //     description: $('#description').val(),
                //     // image: files,
                //     status: $('#status').val()
                // }
                // $.ajax({
                //     url:"http://localhost:3000/api/products",
                //     method:'POST',
                    // contentType : false,
                    // enctype : 'multipart/form-data',
                    // processData: false,
                    // contentType:'application/json',
                    // data: datanya,
                    // data: JSON.stringify(datanya),
                //     success: function(result){
                //         Swal.fire({
                //             position: 'center-end',
                //             icon: 'success',
                //             title: 'Your data has been saved',
                //             showConfirmButton: false,
                //             timer: 1500
                //         })
                //         TableHandler.init();
                //         resetForm();
                //     },error: function(xhr, status,error){
                //         Swal.fire({
                //             icon: 'error',
                //             title: 'Oops...',
                //             text: 'Something went wrong!',
                //         })
                //     }
                // })
                
            })

            // update data
            $('#btnUpdate').on('click', function(e){
                e.preventDefault(); //berfungsi untuk mencegah bawaan terjadinya event bawaan dari dom saat diklik
                var datanya = {
                    serial: $('#serial').val(),
                    product_name: $('#product_name').val(),
                    category_id: $('#category').val(),
                    satuan_id: $('#satuan').val(),
                    harga_beli: $('#harga_beli').val(),
                    harga_jual: $('#harga_jual').val(),
                    stok: $('#stok').val(),
                    description: $('#description').val(),
                    image: $('#image').val(),
                    status: $('#status').val(),
                    barcode:uuid
                }
                $.ajax({
                    url:"http://localhost:3000/api/products/"+editID,
                    method:'put',
                    contentType:'application/json',
                    data: JSON.stringify(datanya),
                    success: function(result){
                        Swal.fire({
                            position: 'center-end',
                            icon: 'success',
                            title: 'Your data has been updated!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        resetForm();
                        TableHandler.init();
                    },error: function(xhr, status,error){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                })
            
            })  
            
            return false
        }
    });
    

    return{
        init: function(){
        }
    }
}();

// function delete product
function deleteProducts(idProd) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url:"http://localhost:3000/api/products/"+idProd,
                method: "DELETE",
                contentType: 'application/json',
                success: function () {
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                    TableHandler.init();
                }, error: function(xhr, ajaxOptions, thrownError){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })      
            return true   
        }
      })    
}
// function get data by id utk pdate
function updateProducts(idProd,serial,product_name,category_id,satuan_id,harga_beli,harga_jual,stok,description,image,status,barcode){
    editID = idProd;
    uuid = barcode;
    console.log(uuid)
    $('#serial').val(serial);
    $('#product_name').val(product_name);
    $('#category').val(category_id).change();
    $('#satuan').val(satuan_id).change();
    $('#harga_beli').val(harga_beli);
    $('#harga_jual').val(harga_jual);
    $('#stok').val(stok);
    $('#description').val(description);
    $('#image').val(image);
    $('#status').val(status).change();
    
    $('#btnUpdate').show();
    $('#btnSave').hide();
}
// function reset text form
var resetForm = function(){
    $('#serial').val('');
    $('#product_name').val('');
    $('#category').val('').change();
    $('#satuan').val('').change();
    $('#harga_beli').val('');
    $('#harga_jual').val('');
    $('#stok').val('');
    $('#description').val('');
    $('#image').val('');
    $('#status').val('').change();
    $('#btnSave').show();
}

// function generate barcode
function generateBarcode(barcode)
{ 
    JsBarcode('#barcode',barcode);
    var element = document.getElementById("barcode");
}

jQuery(document).ready(function(){
    TableHandler.init();
    FormHandleSubmit.init();
})
