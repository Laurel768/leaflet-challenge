// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function to determine marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 5;
}

// function to return the color based on magnitude
function markerColor(magnitude) {
if (magnitude > 4) {
  return 'blue'
} else if (magnitude > 3) {
  return 'red'
} else if (magnitude > 2) {
  return 'orange'
} else if (magnitude > 1) {
  return 'green'
} else {
  return 'yellow'
}
}

// function for opacity based on magnitude
function markerOpacity(magnitude) {
  if (magnitude > 6) {
    return .99
  } else if (magnitude > 5) {
    return .80
  } else if (magnitude > 4) {
    return .70
  } else if (magnitude > 3) {
    return .60
  } else if (magnitude > 2) {
    return .50
  } else if (magnitude > 1) {
    return .40
  } else {
    return .30
  }
}

// GET request, and function to handle returned JSON data
d3.json(queryUrl, function(data) {
  
  var earthquakes = L.geoJSON(data.features, {
    onEachFeature : addPopup,
    pointToLayer: addMarker
  });

// call function to create map
  createMap(earthquakes);

});

function addMarker(feature, location) {
  var options = {
    stroke: false,
    fillOpacity: markerOpacity(feature.properties.mag),
    color: markerColor(feature.properties.mag),
    fillColor: markerColor(feature.properties.mag),
    radius: markerSize(feature.properties.mag)
  }

  return L.circleMarker(location, options);

}

// Define a function we want to run once for each feature in the features array
function addPopup(feature, layer) {
  // Give each feature a popup describing the place and time of the earthquake
  return layer.bindPopup(`<h3> ${feature.properties.place} </h3> <hr> <h4>Magnitude: ${feature.properties.mag} </h4> <p> ${Date(feature.properties.time)} </p>`);
}

function createMap(earthquakes) {

  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layer
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);  


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4],
        color = ['yellow', 'green', 'orange', 'red', 'blue'];
      

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + color[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);
}