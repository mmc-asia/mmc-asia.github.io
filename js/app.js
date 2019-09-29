
		 // Creating map options
         var mapOptions = {
            center: [27.930862, 69.143627],
            zoom: 2, minZoom: 2, maxZoom: 7
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
		// creating map color

         var myStyle = {
			"fillColor": "#009ba4",
			"weight": 0.75,
			"color":'white',
			"fillOpacity": 0.75
			}; 

		 var mmcStyle = {
		 	"color":"#F2F2F2",
		 	"weight":0,
		 	"fillOpacity":0
		 };

	

		 var allCountries = L.geoJson(allCountries, {style: myStyle});


		 //var allMonitors = L.geoJson(allMonitors, {style: myStyle}).addTo(map);
		 var afghanistan = L.geoJson(afghanistan,{weight:0, style: mmcStyle}).bindTooltip(
		 	'<h4 style="background-color:#009ba4; color: #F8F8FF;">&nbspAfghanistan</h4><p>MMC Asia has set up its monitors in <br>Afghanistan in the following cities: <br>Balkh, Herat, Kabul, Kandahar, <br>Kunduz, Nangahar and Nimruz.<br>Total number of reports until <br>present is: '
		 	+ Number(totalAfghanistanReports), {direction: 'left', sticky: 'true', interactive:'true'});

	

		 var india = L.geoJson(india,{weight:0, style: mmcStyle}).bindTooltip(
		 	'<h4 style="background-color:#009ba4; color: #F8F8FF;">&nbspIndia</h4><p>MMC Asia has set up its monitors <br>in New Delhi.<br>Total number of reports until <br>present is: '
		 	+ Number(totalIndiaReports), {direction: 'right', sticky: 'true', interactive:'true'});		
         
         var indonesia = L.geoJson(indonesia,{weight:0, style: mmcStyle}).bindTooltip(
		 	'<h4 style="background-color:#009ba4; color: #F8F8FF;">&nbspIndonesia</h4><p>MMC Asia has set up its monitors <br>in Bogor and Jakarta.<br>Total number of reports until <br>present is: '
		 	+ Number(totalIndonesiaReports), {direction: 'left', sticky: 'true'});		
         
         var greece = L.geoJson(greece,{weight:0, style: mmcStyle}).bindTooltip(
		 	'<h4 style="background-color:#009ba4; color: #F8F8FF;">&nbspGreece</h4><p>MMC Asia has set up its monitors <br>in Athens and Lesbos.<br>Total number of reports until <br>present is: '
		 	+ Number(totalGreeceReports), {direction: 'left', sticky: 'true'});			
         
         var germany = L.geoJson(germany,{weight:0, style: mmcStyle}).bindTooltip(
		 	'<h4 style="background-color:#009ba4; color: #F8F8FF;">&nbspGermany</h4><p>MMC Asia has set up its monitors <br>in Berlin.<br>Total number of reports until <br>present is: '
		 	+ Number(totalGermanyReports), {direction: 'left', sticky: 'true'});		
         
         var malaysia = L.geoJson(malaysia,{weight:0, style: mmcStyle}).bindTooltip(
		 	'<h4 style="background-color:#009ba4; color: #F8F8FF;">&nbspMalaysia</h4><p>MMC Asia has set up its monitors <br> in Ampang and Kuala Lumpur.<br>Total number of reports until <br>present is: '
		 	+ Number(totalMalaysiaReports), {direction: 'right', sticky: 'true'});	

		 		

         var allLayers = L.layerGroup([afghanistan, india, indonesia, greece,germany, malaysia, allCountries])
         					.addTo(map);
		 
		
		


         // adding monitors details
        var markerClusters = L.markerClusterGroup({
        	maxClusterRadius: 50,
        	zoomToBoundsOnClick: true
        });
 
			for ( var i = 0; i < mmcAsia.length; ++i )
				{
				var popup =   '<h5 style="background-color:#009ba4; color: #F8F8FF; text-align: center">4Mi Monitor details</h5>'+	
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


