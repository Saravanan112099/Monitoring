/**
 * Open Street Map Implementation.
 * Supported Map Layers : Street
 * Third party integration : MapQuest for Satellite and Hybrid layers
 * _baseLayer, _hybridLayer, _hybridLayer
 */
(function(){	
	
    var HereMapImpl = {};
    var aj = new AjaxRequest();
	
	var mapUrls = {};	
	mapUrls.cit = {
		normal : "http://{1-4}.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8",
		satellite : "http://{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8",
		hybrid : "http://{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8",
		terrain : "http://{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/terrain.day/{z}/{x}/{y}/256/png8"
	};
	
	mapUrls.production = {
		normal : "http://{1-4}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8",
		satellite : "http://{1-4}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8",
		hybrid : "http://{1-4}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8",
		terrain : "http://{1-4}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/terrain.day/{z}/{x}/{y}/256/png8"
	};	
	
    HereMapImpl.init = function(osmObj) {
	   HereMapImpl.prepareTileUrl(osmObj);
	   HereMapImpl.createMapLayer(osmObj);
    };
	
	HereMapImpl.createMapLayer = function(olmObj) {
		
		olmObj._baseSource = new ol.source.XYZ({           
			url : HereMapImpl.baseMapUrl,
            attributions : [HereMapImpl.getMapAttributions()]
        });
	
        olmObj._baseLayer = new ol.layer.Tile({
            source : olmObj._baseSource
        });
        olmObj.map.getLayers().insertAt(0, olmObj._baseLayer);		
        window.addEventListener('resize', function(evt) {   
            olmObj.refreshMap();
        });		
        olmObj._hybridSource = undefined;
        olmObj._satelliteSource = undefined;
		olmObj._terrainSource = undefined;
		olmObj.currentMapType = "ROADMAP";       
	};
	
	HereMapImpl.updateMapType = function(mapType, olmObj) {		
		var _mapType = mapType.toUpperCase();
        if(_mapType == 'HYBRID') {
			if(olmObj._hybridSource === undefined) {				
				olmObj._hybridSource = new ol.source.XYZ({           
					url :HereMapImpl.hybridMapUrl,
					attributions : [HereMapImpl.getMapAttributions()]
				});			
            }			
            olmObj._baseLayer.setSource(olmObj._hybridSource);
            return;
        }

        if(_mapType == 'SATELLITE') {
            if(olmObj._satelliteSource === undefined) {			
				olmObj._satelliteSource = new ol.source.XYZ({           
					url : HereMapImpl.satelliteMapUrl,
					attributions : [HereMapImpl.getMapAttributions()]
				});			
            }			
            olmObj._baseLayer.setSource(olmObj._satelliteSource);
            return;
        } 

		if(_mapType == 'TERRAIN') {
            if(olmObj._terrainSource === undefined) {			
				olmObj._terrainSource = new ol.source.XYZ({           
					url : HereMapImpl.terrainMapUrl,
					attributions : [HereMapImpl.getMapAttributions()]
				});			
            }			
            olmObj._baseLayer.setSource(olmObj._terrainSource);
            return;
        }
        olmObj._baseLayer.setSource(olmObj._baseSource);
	};
	
	
	HereMapImpl.getMapAttributions = function(olmObj) {
		return new ol.Attribution({
		  html: "&copy; 2013 Nokia</span>&nbsp;<a href='http://maps.nokia.com/services/terms' target='_blank' title='Terms of Use' style='color:#333;text-decoration: underline;'>Terms of Use</a></div> <img src='http://api.maps.nokia.com/2.2.4/assets/ovi/mapsapi/by_here.png' border='0'>"
		});	
	};
		
	HereMapImpl.prepareTileUrl = function(olmObj) {
		var urls;		
		if(CueGis.isProduction) {
			urls = mapUrls.production;
		} else {
			urls = mapUrls.cit;
		}
		
		HereMapImpl.baseMapUrl = urls.normal+"?&app_id="+olmObj.appId+"&app_code="+olmObj.appCode;
		HereMapImpl.hybridMapUrl = urls.hybrid+"?&app_id="+olmObj.appId+"&app_code="+olmObj.appCode;
		HereMapImpl.satelliteMapUrl = urls.satellite+"?&app_id="+olmObj.appId+"&app_code="+olmObj.appCode;
		HereMapImpl.terrainMapUrl = urls.terrain+"?&app_id="+olmObj.appId+"&app_code="+olmObj.appCode;		
	};
	
	return HereMapImpl;
})();