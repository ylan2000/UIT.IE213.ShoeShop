(function() {
  const addToCartBtn = $(".add-to-cart-button");
  $.each(addToCartBtn, function (index) {
    $(this).on("click", function (e) {
      var id = $(this).data("id");
      $.ajax({
        url: "/client/api/add-to-cart/" + id,
        type: "get",
        xhrFields: { withCredentials: true },
        data: { id: id },
        success: function (data) {
          $("#cart-number").html(data.totalQty);
        },
        error: function (err) {
          alert(err);
        },
      });
    });
  });
})();