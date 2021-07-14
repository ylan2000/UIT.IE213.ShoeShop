$("#submitBtn").click(function(event){
    event.preventDefault();
    var shoeSize = [];
    $("#shoeSizeFrom input:checkbox:checked").map(function(){
        shoeSize.push($(this).val());
    });
    console.log(shoeSize);
  });