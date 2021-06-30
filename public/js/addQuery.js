(function() {
  const sortField = $(".sort");

  $.each(sortField, function (index) {
    $(this).on("click", function (e) {
      var type = $(this).data("type");
      var field = $(this).data("sort");
      
      window.location = "/" + type + "?sort=" + field; 
    });
  });
})();