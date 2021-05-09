(function() {
  const addToWishlistBtn = $(".add-to-wishlist");
  $.each(addToWishlistBtn, function (index) {
    $(this).on("click", function (e) {
      var id = $(this).data("id");
      $.ajax({
        url: "/client/api/wishlist/" + id,
        type: "post",
        xhrFields: { withCredentials: true },
        data: { id: id },
        success: function (data) {
          $("#wishlist-number").html(data.totalQty);
        },
        error: function (err) {
          alert(err);
        },
      });
    });
  });

  const removeFromWishlisBtn = $(".remove-from-wishlist");
  $.each(removeFromWishlisBtn, function (index) {
    $(this).on("click", function (e) {
      var id = $(this).data("id");
      var confirmRemove = confirm("Are you sure to remove this item?");
      if (confirmRemove) {
        $.ajax({
          url: "/client/api/wishlist/" + id,
          type: "delete",
          xhrFields: { withCredentials: true },
          data: { id: id },
          success: function (data) {
            $("#wishlist-number").html(data.totalQty);
            location.reload();
          },
          error: function (err) {
            alert(err);
          },
        });
      }
    });
  });
})();
