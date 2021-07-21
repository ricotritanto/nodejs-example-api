"use strict";

var TableHandler = function () {
    var LoadTableData = function(){
        var urle = "http://localhost:3000/api/category";
        $.getJSON(urle, function(data){
            // console.log(data)
            var tablenya = "";
            var no = 1;
            data.forEach((isinya) => {
                // console.log(isinya.product_name);
                var newNo = no++;
                tablenya +='<tr>';
                tablenya +='<td>'+newNo+'</td>';
                tablenya +='<td>'+isinya.category_name+'</td>';
                tablenya +='<td>'+
                            '<a class="btn btn-primary" data-toggle="collapse" onclick="updateCategory('+isinya.id+',\''+isinya.category_name+'\')" aria-expanded="false" aria-controls="collapseExample">Update</a>'+
                            '<a class="btn btn-danger" data-toggle="collapse" onclick="deleteCategory('+isinya.id+')" role="button" aria-expanded="false" aria-controls="collapseExample">Delete</a>'+
                            '</td>';
                tablenya +='</tr>';
            });
            $('#datane').html(tablenya);
            $('#btnUpdate').hide();
        })
    }

    return{
        init:function () {
            LoadTableData();
        }
    }
}();

// var func untuk submit update and save data
var editID = "";
var FormHandleSubmit = function(){
    $("#formCategory").validate({  //validation menggunakan validator dari jquery, 
        rules: {
            category_name: {
                required: true
            }
        },
        submitHandler: function(form){ //untuk menghandle submit, setelah selesai di validasi datanya.
             // create product 
            $('#btnSave').on('click', function(e){
                e.preventDefault(); //berfungsi untuk mencegah bawaan terjadinya event bawaan dari dom saat diklik
                var datanya = {
                    category_name: $('#category_name').val()
                }
                // console.log(datanya);
                $.ajax({
                    url:"http://localhost:3000/api/category",
                    method:'POST',
                    contentType:'application/json',
                    data: JSON.stringify(datanya),
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
                    },error: function(xhr, status,error){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                })
                
            })

            // update data
            $('#btnUpdate').on('click', function(e){
                e.preventDefault(); //berfungsi untuk mencegah bawaan terjadinya event bawaan dari dom saat diklik
                var datanya = {
                    category_name: $('#category_name').val()
                }
                $.ajax({
                    url:"http://localhost:3000/api/category/"+editID,
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

// function untuk ambil data update by id
function updateCategory(idCat, category_name){
    editID = idCat;
    $('#category_name').val(category_name);
    
    $('#btnUpdate').show();
    $('#btnSave').hide();
}

// function resetForm
var resetForm = function(){
    $('#category_name').val('');
    $('#btnUpdate').hide();
    $('#btnSave').show();
}

// function delete category
function deleteCategory(idCat) {
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
                url:"http://localhost:3000/api/category/"+idCat,
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

jQuery(document).ready(function() {
    TableHandler.init();
})