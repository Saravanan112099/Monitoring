/**
 * Google Maps Implementation
 */
(function(){	
	
    var GoogleMapsImpl = {};
    var aj = new AjaxRequest();
	
    GoogleMapsImpl.init = function(osmObj) {      
	   GoogleMapsImpl.createMapLayer(osmObj);
    };
	
	GoogleMapsImpl.createMapLayer = function(olmObj) {
		//var olmObj = this;
		 var googleContainer = CueGis.utils.DOM.createElement({
            element : 'DIV',
            attr : {				
                "id" : 'googleContainer',
                "style" : "height:100%;width:100%;!important"
            }
        }, olmObj.cueGisContainer, true);		
		
		var mapOptions = olmObj.getMapOptions();
		var latLng = mapOptions.center;
        googleMap = new google.maps.Map(googleContainer, {
            disableDefaultUI: true,
            keyboardShortcuts: false,
            draggable: false,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            streetViewControl: false,
            center : {
                lat : latLng[0],
                lng : latLng[1]
            },
            zoom : mapOptions.zoom
        });	

        // var that = this;
        olmObj._googleMap = googleMap;
		olmObj.googleContainer = googleContainer;
		
        olmObj._baseView.on('change:center', function() {			
            var center = ol.proj.transform(olmObj._baseView.getCenter(), 'EPSG:3857', 'EPSG:4326');
            googleMap.setCenter(new google.maps.LatLng(center[1], center[0]));
        });

        olmObj._baseView.on('change:resolution', function() {			
            googleMap.setZoom(olmObj._baseView.getZoom());
        });
        window.addEventListener('resize', function() {            
            var center = olmObj._googleMap.getCenter();			
            google.maps.event.trigger(olmObj._googleMap, "resize");			
            olmObj._googleMap.setCenter(center); 						
        });        
        googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(olmObj._olContainer);	
		
		// Implementation for Google Traffic Layer in Google Maps
		//var trafficLayer = new google.maps.TrafficLayer();
		//trafficLayer.setMap(googleMap);	
		olmObj.currentMapType = "ROADMAP";
    
	};
	
	GoogleMapsImpl.getMapAttributions = function(olmObj) {
		//
	};
	
	GoogleMapsImpl.updateMapType = function(mapType, olmObj) {
		if(olmObj._googleMap !== undefined) {
            olmObj._googleMap.setMapTypeId(google.maps.MapTypeId[mapType]);
        }     
	};
	
	return GoogleMapsImpl;
})();