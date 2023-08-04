$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/assets/tsv/pico.tsv",
    dataType: "text",
    success: function(data) {
      var lines = data.split("\n");
      var outputDiv = $("#output");
      var dataArray = []; // Array to store data for sorting

      // ... your existing code for extracting data and sorting ...

      // Create divs for each row
      for (var j = 0; j < lines.length; j++) {
        var rowData = lines[j].split("\t");
        var headers = lines[0].split("\t");

        // Extract specific values based on headers
        if (j > 0) {
          var cols = rowData;
          var dir_title = cols[headers.indexOf('Games')];
          var dir_price = cols[headers.indexOf('Price')];
          var dir_type = cols[headers.indexOf('Type')];
          var dir_area = cols[headers.indexOf('Area')];
          var dir_date = cols[headers.indexOf('Date')];

          // Store the row data in an object and push it to the dataArray
          dataArray.push({
            title: dir_title,
            price: dir_price,
            type: dir_type,
            area: dir_area,
            date: dir_date
          });
        }
      }

     // Extract unique types for the filter dropdown and remove spaces
      var uniqueTypesSet = new Set(dataArray.flatMap(item => item.type.split("|").map(type => type.trim())));
      var uniqueTypesArray = [...uniqueTypesSet];

      // Sort the unique types alphabetically
      uniqueTypesArray.sort();

      // Populate the filterDropdown with unique types and remove spaces
      var filterDropdown = $("#filterDropdown");
      filterDropdown.empty(); // Clear previous options
      filterDropdown.append('<option value="">Filter by Type</option>');
      uniqueTypesArray.forEach(type => {
        var option = $("<option></option>").attr("value", type).text(type);
        filterDropdown.append(option);
      });

      // Function to filter data based on the selected type
      function filterData(selectedType, searchQuery) {
        var filteredData = selectedType
          ? dataArray.filter(item => item.type.includes(selectedType))
          : dataArray;

        // Filter the data based on the search query
        if (searchQuery) {
          searchQuery = searchQuery.toLowerCase();
          filteredData = filteredData.filter(item => item.title.toLowerCase().includes(searchQuery));
        }

        // Sort the filtered data based on the selected option
        var sortOption = $("#sortDropdown").val();
        if (sortOption === "az") {
          filteredData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "za") {
          filteredData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === "date") {
          filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortOption === "newest-date") {
          filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortOption === "price-asc") {
          filteredData.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
            const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
            return priceA - priceB;
          });
        } else if (sortOption === "price-desc") {
          filteredData.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
            const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
            return priceB - priceA;
          });
        }

        // Update filtered results count
        var filteredResultsCount = filteredData.length;
        $("#filteredResultsCount").text(filteredResultsCount);

        // Clear the existing content of outputDiv
        outputDiv.empty();

        // Create divs for each row based on sorted filteredData
        for (var i = 0; i < filteredData.length; i++) {
          var dataItem = filteredData[i];

// Split the dataItem.type
  var types = dataItem.type.split("|");

  // Create spans for each type
  var typeSpans = types.map(function(type) {
    return '<span class="type">' + type + '</span>';
  }).join(' ');

          var tr_html = '<div class="row-col" data-id="name">' +
                            //'<div class="image-icon" style="background-image: url(/images/' + lowert +'.jpg), url(/images/placeholder-images-image_large.png)"></div>' +
                            '<div class="col" data-id="name">' + dataItem.title +'</div>' +
                            '<div class="col" data-id="price">' + dataItem.price +'</div>' + 
                            '<div class="col" data-id="type">' + typeSpans +'</div>' +   
                            '<div class="col" data-id="date">' + dataItem.date +'</div>' +    
                          '</div>';

          outputDiv.append(tr_html);
        }
      }

      // Initial sorting and filtering on page load
      var sortOption = "newest-date"; // Default: Sort Date Newest First
      var selectedType = ""; // Default: Show all types
      filterData(selectedType);

      // Handle search input keyup event
      $("#searchInput").on("keyup", function() {
        var searchQuery = $(this).val();
        filterData(selectedType, searchQuery);
      });

      // Handle sort dropdown change event
      $("#sortDropdown").change(function() {
        sortOption = $(this).val();
        filterData(selectedType);
      });

      // Handle filter dropdown change event
      $("#filterDropdown").change(function() {
        selectedType = $(this).val();
        filterData(selectedType);
      });

      // Update total results count
      var totalResultsCount = dataArray.length;
      $("#totalResultsCount").text(totalResultsCount);
    }
  });
});