         // Creating map options
  var mapOptions = {
            center: [27.930862, 69.143627],
            zoom: 3, minZoom: 3
         }
         
         // Creating a map object
  var map = new L.map('map', mapOptions,{
         	zoomSnap: 0.25
         });

      map.createPane('labels');

    // Creating a Layer object
  var layers = new L.TileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
         	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | Generated by &copy; <a href="http://www.mixedmigration.org/"> Mixed Migration Center</a>'
         }).addTo(map);



    // creating map color

  var myStyle = {
      			"color": "#009ba4",
      			"weight": 0.25,
      			"fillOpacity": 0.9
      			};

  var allMonitors = L.geoJson(allMonitors, {style: myStyle}).addTo(map);
    
		
      // adding monitors details
  var markerClusters = L.markerClusterGroup({
      	maxClusterRadius: 50
        });
 
		for ( var i = 0; i < mmcAsia.length; ++i )
          {
            var popup =   '<h5 align="center">4Mi Monitor details</h5>'+    
                          '<b>ID</b>: '+ mmcAsia[i].geoID +
                          '<br/><b>Country</b>: ' + mmcAsia[i].operationalLocationCountry +
                          '<br/><b>City</b>: ' + mmcAsia[i].RegionCity+
                          '<br/><b>Number of reports</b>: ' + mmcAsia[i].Reports+
                          '<br/><b>Interview language</b>: ' + mmcAsia[i].InterviewLanguage +                           '<br/><b>Contract start date: </b> ' + mmcAsia[i].contractStartDate +
                          '<br/><b>Contract end date: </b> ' + mmcAsia[i].contractEndDate;
                 
            var m = L.marker([mmcAsia[i].Latitude, mmcAsia[i].Longitude])
                                  .bindPopup( popup );

            markerClusters.addLayer(m);

          }

  map.addLayer(markerClusters);
  map.fitBounds(allLayers.getBounds());