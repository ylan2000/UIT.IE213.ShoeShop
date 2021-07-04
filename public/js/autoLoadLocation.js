(function() {
  $("#country-field").on("change", function () {
      $("#state-field option").remove();
      $("#city-field option").remove();

      $('#city-field').append($('<option>', { 
          value: "default",
          text : "city",
          selected: "true", 
          disabled: "true"
      }));

      $.ajax({
          url: "/client/api/getStatesOfCountry",
          type: "post",
          data: { countryCode: $("#country-field").val() },
          success: function (data) {
              if (data.length == "0") {
                      $('#state-field').append($('<option>', { 
                      value: "default",
                      text : "No State Was Found!",
                      selected: "true", 
                      disabled: "true"
                  }));
              }

              $.each(data, function (i, item) {
                  $('#state-field').append($('<option>', { 
                      value: item["isoCode"],
                      text : item["name"] 
                  }));
              });
          },
          error: function (err) {
              alert(err);
          },
      });
  });

  $("#state-field").on("change", function () {
      $("#city-field option").remove();

      $.ajax({
          url: "/client/api/getCitiesOfState",
          type: "post",
          data: { 
              countryCode: $("#country-field").val(),
              stateCode: $("#state-field").val()
          },
          success: function (data) {
              if (data.length == "0") {
                      $('#city-field').append($('<option>', { 
                      value: "default",
                      text : "No City Was Found!",
                      selected: "true", 
                      disabled: "true"
                  }));
              }

              $.each(data, function (i, item) {
                  $('#city-field').append($('<option>', { 
                      value: item["isoCode"],
                      text : item["name"] 
                  }));
              });
          },
          error: function (err) {
              alert(err);
          },
      });
  });
})();