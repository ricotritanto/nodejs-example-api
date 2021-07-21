"use strict";

var TableHandler =  function(){
    var LoadTableData = function(){
        var urle = "http://localhost:3000/api/satuan";
        $.getJSON(urle, function(data){
            // console.log(data)
            var tablenya = "";
            var no = 1;
            data.forEach((isinya) => {
                // console.log(isinya.product_name);
                var newNo = no++;
                tablenya +='<tr>';
                tablenya +='<td>'+newNo+'</td>';
                tablenya +='<td>'+isinya.name+'</td>';
                tablenya +='<td>'+
                            '<a class="btn btn-primary" data-toggle="collapse" onclick="updateSatuan('+isinya.id+',\''+isinya.name+'\')" aria-expanded="false" aria-controls="collapseExample">Update</a>'+
                            '<a class="btn btn-danger" data-toggle="collapse" onclick="deleteSatuan('+isinya.id+')" role="button" aria-expanded="false" aria-controls="collapseExample">Delete</a>'+
                            '</td>';
                tablenya +='</tr>';
            });
            $('#datane').html(tablenya);
            $('#btnUpdate').hide();
        })
    }


    return{
        init:function(){
            LoadTableData();
        }
    }
}();

// handle submit simpan dan update
var editID = "";
var FormHandleSubmit = function(){
    $("#formSatuan").validate({  //validation menggunakan validator dari jquery, 
        rules: {
            satuan_name: {
                required: true
            }
        },
        submitHandler: function(form){ //untuk menghandle submit, setelah selesai di validasi datanya.
             // create product 
            $('#btnSave').on('click', function(e){
                e.preventDefault(); //berfungsi untuk mencegah bawaan terjadinya event bawaan dari dom saat diklik
                var datanya = {
                    name: $('#satuan_name').val()
                }
                // console.log(datanya);
                $.ajax({
                    url:"http://localhost:3000/api/satuan",
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
                    name: $('#satuan_name').val()
                }
                $.ajax({
                    url:"http://localhost:3000/api/satuan/"+editID,
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

// function get data by id utk pdate
function updateSatuan(idSat, satuan_name){
    editID = idSat;
    $('#satuan_name').val(satuan_name);
    
    $('#btnUpdate').show();
    $('#btnSave').hide();
}
// function reset text form
var resetForm = function(){
    $('#satuan_name').val('');
    $('#btnUpdate').hide();
    $('#btnSave').show();
}

// function untuk delete
function deleteSatuan(idSat) {
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
                url:"http://localhost:3000/api/satuan/"+idSat,
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
});