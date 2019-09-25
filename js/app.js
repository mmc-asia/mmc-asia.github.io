
         // Creating map options
         var mapOptions = {
            center: [27.930862, 69.143627],
            zoom: 3, minZoom: 3, maxZoom: 8
         }
         
         // Creating a map object
         var map = new L.map('map', mapOptions,{
         	zoomSnap: 0.25
         });

         map.createPane('labels');
//'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'

         // Creating a Layer object
         var layers = new L.TileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
         	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | Generated by &copy; <a href="http://www.mixedmigration.org/"> Mixed Migration Center</a>'
         }).addTo(map);


         // creating map color

         var myStyle = {
			"color": "#009ba4",
			"weight": 0.25,
			"fillOpacity": 0.7
			};

		// calculate total number of reports per country
		 var totalAfghanistanReports = 0;
		 var totalIndiaReports = 0;
		 var totalIndonesiaReports = 0;
		 var totalGreeceReports = 0;
		 var totalMalaysiaReports = 0;
		 var totalGermanyReports = 0;

			for (var i = 0; i < mmcAsia.length; i++){
				
				if (mmcAsia[i].operationalLocationCountry === 'India') {
				totalIndiaReports +=mmcAsia[i].Reports;

			}
				else if (mmcAsia[i].operationalLocationCountry ==='Afghanistan') {
					totalAfghanistanReports += mmcAsia[i].Reports;
				}
				else if (mmcAsia[i].operationalLocationCountry ==='Indonesia') {
					totalIndonesiaReports += mmcAsia[i].Reports;
				}
				else if (mmcAsia[i].operationalLocationCountry ==='Greece') {
					totalGreeceReports += mmcAsia[i].Reports;
				}
				else if (mmcAsia[i].operationalLocationCountry ==='Malaysia') {
					totalMalaysiaReports += mmcAsia[i].Reports;
				}
				else if (mmcAsia[i].operationalLocationCountry ==='Germany') {
					totalGermanyReports += mmcAsia[i].Reports;
				}
			
		}

		 //var allMonitors = L.geoJson(allMonitors, {style: myStyle}).addTo(map);
		 var afghanistan = L.geoJson(afghanistan, {style: myStyle}).bindTooltip(
		 	'<h4>Afghanistan</h4>MMC Asia has set up its monitors <br>in three different regions <br> of Afghanistan since (insert year).<br>Total number of reports until <br>present is: '
		 	+ Number(totalAfghanistanReports), {direction: 'left'});
		 var india = L.geoJson(india, {style: myStyle}).bindTooltip(
		 	'<h4>India</h4>MMC Asia has set up its monitors <br>in New Delhi, India in (insert year)<br>Total number of reports until <br>present is: '
		 	+ Number(totalIndiaReports), {direction: 'center'});		
         var indonesia = L.geoJson(indonesia, {style: myStyle}).bindTooltip(
		 	'<h4>Indonesia</h4>MMC Asia has set up its monitors <br>in Indonesia in (insert year)<br>Total number of reports until <br>present is: '
		 	+ Number(totalIndonesiaReports), {direction: 'center'});		
         var greece = L.geoJson(greece, {style: myStyle}).bindTooltip(
		 	'<h4>Greece</h4>MMC Asia has set up its monitors <br>in Greece in (insert year)<br>Total number of reports until <br>present is: '
		 	+ Number(totalGreeceReports), {direction: 'left'});			
         var germany = L.geoJson(germany, {style: myStyle}).bindTooltip(
		 	'<h4>Germany</h4>MMC Asia has set up its monitors <br>in Germany in (insert year)<br>Total number of reports until <br>present is: '
		 	+ Number(totalGermanyReports), {direction: 'left'});		
         var malaysia = L.geoJson(malaysia, {style: myStyle}).bindTooltip(
		 	'<h4>Malaysia</h4>MMC Asia has set up its monitors <br>in Malaysia in (insert year)<br>Total number of reports until <br>present is: '
		 	+ Number(totalMalaysiaReports), {direction: 'right'});		

         var allLayers = L.layerGroup([afghanistan, india, indonesia, greece,germany, malaysia])
         					.addTo(map);
		 
		
		 
         // adding monitors details
        var markerClusters = L.markerClusterGroup({
        	maxClusterRadius: 50,
        	zoomToBoundsOnClick: true
        });
 
			for ( var i = 0; i < mmcAsia.length; ++i )
				{
				var popup =   '<h5 align="center">4Mi Monitor details</h5>'+	
							  '<b>ID</b>: '+ mmcAsia[i].geoID +
				              '<br/><b>Country</b>: ' + mmcAsia[i].operationalLocationCountry +
				              '<br/><b>City</b>: ' + mmcAsia[i].RegionCity+
				              '<br/><b>Number of reports</b>: ' + mmcAsia[i].Reports+
				              '<br/><b>Interview language</b>: ' + mmcAsia[i].InterviewLanguage;
				 
				var m = L.marker([mmcAsia[i].Latitude, mmcAsia[i].Longitude])
				                  .bindPopup( popup );

				markerClusters.addLayer(m);

				}

		map.addLayer(markerClusters);