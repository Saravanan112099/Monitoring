/**
* OpenWeatherMap is the implementation for Cuecent GIS Abstract Weather plugin
*/
OpenWeatherMap = {
	
	// available weather layes in OpenWeatherMap service
	_supportedLayers : ['clouds', 'precipitation', 'precipitation_cls', 'pressure', 'wind', 'temp', 'snow', 'rain',
		'rain_cls', 'clouds_cls', 'pressure_cntr'
	],
	
	// holds a map where key is the type of layer and value is the ol.Layer object for that layer
	_layers : {},
	
	// true means weather data is showing
	_isShowing : false,
	
	_currentPlace : undefined,	
	
	// OpenLayerMap instance
	_olImpl : undefined,
	
	// CuecentGISPallet instance
	_cuecentGisPallet : undefined,
	
	// true to enable console logs
	showLogs : false,
	
	// POIElement instance used to draw weather data icon
	_weatherElement : undefined,
	
	
	// initialize this plugin
	init : function(config, olImpl, cuecentGISPallet) {

		for(var key in config) {
			this[key] = config[key];
		}	
		this._olImpl = olImpl;
		this._cuecentGisPallet = cuecentGISPallet;
		this._weatherElement = new PoiElement({
			isClusteringEnabled:false,
			markerOptions :{				
				draggable : true
			}
		});
		cuecentGISPallet.addElement(this._weatherElement);
				
		if(config.layers) {
			var layers = config.layers;		
			if(JSUtils.isArray(layers)) {
				for(var i=0;i<layers.length;i++) {
					var layer = layers[i];
					if(this._supportedLayers.indexOf(layer) > -1) {
						this._createLayer(layer);
					} else {
						this._log(layer + " not supported by OpenWeatherMap");
					}
				}
			} else {
				// single layer implementation, After this implementation user 
				// will able to give a single instead of array in config file
			}
		} 
		
		var this_ = this;
		this._olImpl.map.on('moveend', function(){
			if(this_._isShowing === true) {				
				this_._updateWeatherData();
			}
		});
		
	},
	
	// Show the weather data including layer and climate
	showWeather : function() {	
		this._log("Showing Weather");
		for(var key in this._layers) {			
			if(this._layers.hasOwnProperty(key)) {
				var layer = this._layers[key];				
				this._olImpl.showLayer(layer);
			}
		}
		
		var bm = this._olImpl.getBookMarks();
		this._updateWeatherData();
		this._showWeatherLayer();
		this._isShowing = true;
	},
		
	hideWeather : function() {
		this._log("Hiding Weather");
		for(var key in this._layers) {
			if(this._layers.hasOwnProperty(key)) {
				var layer = this._layers[key];
				this._olImpl.hideLayer(layer);
			}
		}		
		this._hideWeatherLayer();
		this._isShowing = false;
	},
	
	_createLayer : function(layer) {
		this._log("Creating layer - "+layer);
		this._layers[layer] = new ol.layer.Tile({
			opacity : 0.8,
			source : new ol.source.XYZ({
					url : 'http://tile.openweathermap.org/map/'+layer+'/{z}/{x}/{y}.png'
			}) 
		});
		
		this._olImpl.map.addLayer(this._layers[layer]);
		this._olImpl.hideLayer(this._layers[layer]);
	},
	
	_log : function(message) {
		if(this.showLogs) {	
			console.log(message);
		}
	},
	
	_getWeatherData : function(lat, lng) {
			
		var count = this.maxPoints;
		var this_ = this;		
		var requestString = "http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lng+"&cnt="+count+"&APPID=654b5f77164086c394f79b7995d5b877&units=metric";
		var request = new XMLHttpRequest();
		request.onload = this._processResults();
		request.open("get", requestString, true);
		request.send();
	},
	
	_getWeatherDataForBox : function(northLat, eastLng, southLat, westLng) {
		
		//var lat = 23.64214;
		//var lng = 58.12428;
		
		var count = this.maxPoints;
		var this_ = this;
		var zoom = this_._olImpl.getBookMarks().zoomLevel;
			
		var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="+
                        westLng + "," + northLat + ","+ //left top
                        eastLng + "," + southLat + ","+ //right bottom
                        zoom+
						"&APPID=654b5f77164086c394f79b7995d5b877"+
                        "&cluster=no&format=json";
		
		var request = new XMLHttpRequest();	
		request.onload = this._processResults();
		request.open("get", requestString, true);
		request.send();
	},
	
	_showWeatherLayer : function() {
		this._weatherElement.showLayer();
	},
	
	_hideWeatherLayer : function() {
		this._weatherElement.hideLayer();
	},
	
	_updateWeatherData : function() {
		var bounds = this._olImpl.getExtent();	
		var nw = this._olImpl.transformLatLng(bounds[0], bounds[1]);
		var se = this._olImpl.transformLatLng(bounds[2], bounds[3]);				
		this._getWeatherDataForBox(nw[0], nw[1], se[0], se[1]);
	},

	// Process the data from weather API and add POIs for them
	_processResults : function() {
		var this_ = this;
		return function() {			
			var results = JSON.parse(this.responseText);
			if (results.list.length > 0) {
				this_._weatherElement.clearAll(this_._cuecentGisPallet);
				for (var i = 0; i < results.list.length; i++) {
					var feature = results.list[i];
					this_._weatherElement.loadPOI({
						latitude : feature.coord.lat,
						longitude : feature.coord.lon,
						markerOptions : {
							draggable : false,
							icon : "http://openweathermap.org/img/w/"+
									 feature.weather[0].icon + ".png",
						},              
						pId : feature.id,					
						metaData : feature, 
						toolTip : feature.name +":"+feature.weather[0].description,
					}, this_._cuecentGisPallet);				
				}				
			}
		};	
	}
};
