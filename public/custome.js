$(document).ready(function () {
    $('#catagoryChange').on('change', function (e) {
        e.preventDefault();
        var catagory_value = $("#catagoryChange option:selected").val();
        $.ajax({
            type: "post",
            data: { catagory: catagory_value },
            url: '/products/getCatagory',
            success: function (data) {
                var CatagoryList = "<option value=''>Select Catagory</option>";
                for (var i = 0; i < data.length; i++) {
                    CatagoryList += "<option value='" + data[i]._id + "'>" + data[i].subCatagory + "</option>";
                }
                $("#subCatagorySelect").html(CatagoryList);
            }
        });
    });
});



function DeleteProducts(id){
    if (confirm("Are you Sure, Do you want to delete?")) {
        $.ajax({
            method: "DELETE",
            url: "/products/addProducts/" + id
        })
    }
}