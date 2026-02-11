/* Main function: call functions in order */
function initialize() {
  cities();              // 1) draw the table
  addColumns(cityPop);   // 2) add City Size column
  addEvents();           // 3) add hover + click events
}

/* Data: array of objects (each object has city + population) */
var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

/* Create a table using createElement */
function cities() {

  // create the table element
  var table = document.createElement("table");

  // create the header row
  var headerRow = document.createElement("tr");

  // create header cell: City
  var cityHeader = document.createElement("th");
  cityHeader.innerHTML = "City";
  headerRow.appendChild(cityHeader);

  // create header cell: Population
  var popHeader = document.createElement("th");
  popHeader.innerHTML = "Population";
  headerRow.appendChild(popHeader);

  // add header row to table
  table.appendChild(headerRow);

  // create one row for each city object
  for (var i = 0; i < cityPop.length; i++) {

    // create a new row
    var tr = document.createElement("tr");

    // create city cell
    var city = document.createElement("td");
    city.innerHTML = cityPop[i].city;
    tr.appendChild(city);

    // create population cell
    var pop = document.createElement("td");
    pop.innerHTML = cityPop[i].population;
    tr.appendChild(pop);

    // add row to table
    table.appendChild(tr);
  }

  // add table to the div in index.html
  var myDiv = document.getElementById("mydiv");
  myDiv.appendChild(table);
}

/* Add a new column: City Size (Small / Medium / Large) */
function addColumns(cityPop) {

  // select all rows (header row + data rows)
  var rows = document.querySelectorAll("tr");

  // loop through each row
  for (var i = 0; i < rows.length; i++) {

    // header row (first row)
    if (i === 0) {

      // create a header cell
      var headerCell = document.createElement("th");
      headerCell.innerHTML = "City Size";

      // add header cell to header row
      rows[i].appendChild(headerCell);

    } else {

      // decide city size by population
      var citySize;

      if (cityPop[i - 1].population < 100000) {
        citySize = "Small";
      } else if (cityPop[i - 1].population < 500000) {
        citySize = "Medium";
      } else {
        citySize = "Large";
      }

      // create a new td cell
      var sizeCell = document.createElement("td");
      sizeCell.innerHTML = citySize;

      // add the new cell to the row
      rows[i].appendChild(sizeCell);
    }
  }
}

/* Add hover and click events */
function addEvents() {

  // select the table
  var table = document.querySelector("table");

  // hover: when mouse enters table, change color
  table.addEventListener("mouseover", function () {

    // make a random rgb color
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);

    // set color
    table.style.color = "rgb(" + r + "," + g + "," + b + ")";
  });

  // click: show an alert
  function clickme() {
    alert("Hey, you clicked the table!");
  }

  table.addEventListener("click", clickme);
}




/******************************************************
 * Chapter 3 Activity 4: Debug AJAX
 ******************************************************/

// A global variable: we want to test where/when data is available
var myData;

// This function runs AFTER the data has loaded
function debugCallback(data) {

  // Save the loaded GeoJSON into the global variable
  myData = data;

  // Convert JSON object into a long string for display
  var geojsonString = JSON.stringify(myData);

  // Add the GeoJSON text to the page (inside #mydiv)
  // <pre> keeps formatting, and pre-wrap lets long lines wrap
  document.querySelector("#mydiv").insertAdjacentHTML(
    "beforeend",
    "<br><br><strong>GeoJSON data:</strong><br>" +
      "<pre style='white-space: pre-wrap;'>" +
        geojsonString +
      "</pre>"
  );

  // Show that data IS available inside the callback
  console.log("INSIDE callback (data ready):", myData);
}

// This function STARTS the fetch request
function debugAjax() {

  // Show that data is NOT available yet (because fetch is async)
  console.log("OUTSIDE callback (not ready yet):", myData);

  // Request the GeoJSON file
  fetch("data/MegaCities.geojson")
    // Convert Response -> JSON (this returns a Promise)
    .then(function (response) {
      return response.json();
    })
    // Now we have real JSON data, send to callback
    .then(debugCallback);
}

// Run everything after HTML is loaded
document.addEventListener("DOMContentLoaded", function () {
  initialize(); // Chapter 2: build the table + add events
  debugAjax();  // Chapter 3: fetch GeoJSON + print it
});
