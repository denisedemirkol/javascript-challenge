// from data.js
var tableData = data;


// YOUR CODE HERE!
// Select the form
var form    = d3.select("#form");
var button  = d3.select("#filter-btn");
var tbody   = d3.select("tbody");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);


// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    var inputElement  = d3.select("#datetime");  
    var inputValue    = inputElement.property("value");
    var p_date        = new Date(String(inputValue));

    console.log(p_date)

    if (inputValue != "") {
      var filteredData = data.filter(ufo => (ufo.datetime) === inputValue);        
    }
    else // if no filter entered, display everything
    {
      var filteredData = data      
    }  

    //var tbody   = d3.select("tbody");
 
      // Clear the table 
          var tableHeaderRowCount = 1;
          var table = document.getElementById('ufo-table');
          var rowCount = table.rows.length;
          for (var i = tableHeaderRowCount; i < rowCount; i++) {
              table.deleteRow(tableHeaderRowCount);
          }

    filteredData.forEach((filteredData) => {
    var row = tbody.append("tr");
          
    Object.entries(filteredData).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);      
          });
    });
    


}; // EOF Run ENter


button.on("click", runEnter);

window.onload = function() {
  console.log("Page load")

   data.forEach((data) => {
    var row = tbody.append("tr");
          
    Object.entries(data).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);      
          });
    });



};