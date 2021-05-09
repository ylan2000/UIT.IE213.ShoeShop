(function() {
  const addToCartBtn = $(".add-to-cart-button");
  $.each(addToCartBtn, function (index) {
    $(this).on("click", function (e) {
      var id = $(this).data("id");
      $.ajax({
        url: "/client/api/cart/" + id,
        type: "post",
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

  const removeFromCartBtn = $(".remove-from-cart");
  $.each(removeFromCartBtn, function (index) {
    $(this).on("click", function (e) {
      var id = $(this).data("id");
      var confirmRemove = confirm("Are you sure to remove this item?");
      // console.log()
      if (confirmRemove) {
        $.ajax({
          url: "/client/api/cart/" + id,
          type: "delete",
          xhrFields: { withCredentials: true },
          data: { id: id },
          success: function (data) {
            $("#cart-number").html(data.totalQty);
            location.reload();
          },
          error: function (err) {
            alert(err);
          },
        });
      }
    });
  });

  const qtyInfo = $(".product-quantity");
  $.each(qtyInfo, function (index) {
    $(this).on("click", function (e) {
      var id = $(this).data("id");
      var qty = $(this).val();
      $.ajax({
        url: "/client/api/cart/" + id,
        type: "patch",
        xhrFields: { withCredentials: true },
        data: { id: id, newQty: qty },
        success: function (data) {
          $("#cart-number").html(data.totalQty);
          $("#cart__totalMoney").val("$" + data.totalPrice);
          $(".product-full-price[data-id=" + id +"]").html("$" + data.items[id].price);
        },
        error: function (err) {
          alert(err);
        },
      });
    });
  });
})();
