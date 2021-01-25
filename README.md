Leaflet Homework - Visualizing Data with Leaflet

## Background


Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.



## Your Task

Our task was to visualize an earthquake data set.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes.
We selected 'All Earthquakes from the Past 7 Days' from the USGS GeoJSON Feed: http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php.

We created a map Leaflet that plots all of the earthquakes from our data set based on their longitude and latitude.

The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color (see legend).

Popups provide additional information about the earthquake when a marker is clicked.


### Level 2: More Data

The USGS requested a second data set on our map to illustrate the relationship between tectonic plates and seismic activity. 
We pulled in a second data set on tectonic plates from https://github.com/fraxen/tectonicplates.
See additional base maps and the option to toggle the data sets on or off.
