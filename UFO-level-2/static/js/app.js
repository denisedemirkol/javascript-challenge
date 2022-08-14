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


shapes =[]  


function load_options() {

  Object.entries(tableData).forEach(([key, value]) => {    


      if(shapes.indexOf(value["shape"]) === -1) {
             shapes.push(value["shape"]);
      }

  });

  shapes.sort() 
}



// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    var inputElement  = d3.select("#datetime");  
    var inputValue    = inputElement.property("value");

    
    var inputCountry         = d3.select("#countryList");  
    var inputCountryValue    = inputCountry.property("value");

 
    var inputState          = d3.select("#stateList");  
    var inputStateValue     = inputState.property("value");
 

    var inputCity           = d3.select("#cityList");  
    var inputCityValue      = inputCity.property("value");

    var inputShape          = d3.select("#shapeList");  
    var inputShapeValue     = inputShape.property("value");


    let filteredValues = data.filter(function (currentElement) {
      return (currentElement.country  == inputCountryValue  || inputCountryValue == "")
          && (currentElement.state    == inputStateValue    || inputStateValue == "")
          && (currentElement.city     == inputCityValue     || inputCityValue == "")
          && (currentElement.shape    == inputShapeValue    || inputShapeValue == "")
          ;
    });



    if (inputValue != "") {      
      var p_date        = new Date(String(inputValue));
      var filteredData  = filteredValues.filter(ufo => new Date(ufo.datetime).toDateString()  === p_date.toDateString());        
    }
    else // if no filter entered, display everything
    {
      var filteredData = filteredValues      
    }  


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



var worldData = {
ca: {
    on: ["ingleside (canada)", "london (canada)"]
},
us: {
  ak: ["anchorage","willow"],
  al: ["madison"],
  ar: ["alma","benton","searcy"],
  az: ["maricopa","phoenix"],
  ca: ["antioch","bakersfield","bonita","ceres","chula vista","el cajon","fairfield","freedom (watsonville)","fresno","la mesa","lemon grove","lompoc",
  "national city","orange","pacific palisades","pasadena","sacramento","san diego","san jacinto","san pablo",
  "santa fe springs","spring valley","whittier"],
  co: ["aspen","boulder","falcon","loveland"],
  ct: ["westbrook"],
  fl: ["baker","boca raton","crestview","fort myers","gulf breeze","jasper","lakeland","middleburg",
  "naples","port saint lucie"],
  ga: ["atlanta"],
  ia: ["cedar rapids"],
  in: ["princeton"],
  ks: ["pratt","wichita"],
  ky: ["leatherwood","paducah","park city"],
  la: ["eunice"],
  ma: ["edgartown","haverhill","mansfield","norton","taunton","uxbridge","west boylston"],
  md: ["hancock"],
  mi: ["saline"],
  mo: ["butler","joplin","st. louis"],
  ms: ["ackerman"],
  nc: ["cary","deep run","rockwell","waxhaw"],
  nh: ["windham"],
  nj: ["clinton","colonia","woodbridge"],
  nm: ["albuquerque","tularosa"],
  ny: ["buffalo","glen spey","new paltz","southampton"],
  oh: ["cincinnati","cleveland","mason"],
  or: ["eugene","grants pass","springfield"],
  pa: ["white oak"],
  sc: ["anderson"],
  tn: ["cleveland"],
  tx: ["ben wheeler","fort worth","round rock","tomball"],
  va: ["reedville"],
  wa: ["seattle"],
  wi: ["francis creek","walworth","waukesha"],
  wv: ["fayetteville"]
}
};


window.onload = function() {
 
shapes =[]  
v_worlddata = {}

load_options()

  // Table load

  data.forEach((data) => {
    var row = tbody.append("tr");
          
    Object.entries(data).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);      

          });
    });  // end of data




      var countryList = document.getElementById("countryList"),
          stateList   = document.getElementById("stateList"),
          cityList    = document.getElementById("cityList"),
          shapeList   = document.getElementById("shapeList");
      

       for (var i = 0; i < shapes.length; i++) {
            shapeList.options[shapeList.options.length] = new Option(shapes[i], shapes[i]);
       }
  
          

      for (var country in worldData) {
          countryList.options[countryList.options.length] = new Option(country, country);
     
      }

      countryList.onchange = function () {
          stateList.length = 1;
          cityList.length = 1;
          if (this.selectedIndex < 1) return;
          for (var state in worldData[this.value]) {
              stateList.options[stateList.options.length] = new Option(state, state);
          }
      };

      countryList.onchange();
      stateList.onchange = function () {
          cityList.length = 1;
          if (this.selectedIndex < 1) return;
          var city = worldData[countryList.value][this.value];
          for (var i = 0; i < city.length; i++) {
              cityList.options[cityList.options.length] = new Option(city[i], city[i]);
          }
      };


};


