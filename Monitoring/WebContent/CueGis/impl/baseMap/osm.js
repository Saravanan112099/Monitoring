/**
 * Open Street Map Implementation.
 * Supported Map Layers : Street
 * Third party integration : MapQuest for Satellite and Hybrid layers
 * _baseLayer, _hybridLayer, _hybridLayer
 */
(function(){	
	
    var OSMImpl = {};
    var aj = new AjaxRequest();
	
    OSMImpl.init = function(osmObj) {       
	   OSMImpl.createMapLayer(osmObj);
    };
	
	OSMImpl.createMapLayer = function(olmObj) {
		olmObj._baseSource = new ol.source.OSM({
            attributions : OSMImpl.getMapAttributions(olmObj)
        });
        olmObj._hybridLayer = undefined;
        olmObj._satelliteLayer = undefined;
        olmObj._baseLayer = new ol.layer.Tile({
            source : olmObj._baseSource
        });	
		olmObj.currentLayer = olmObj._baseLayer;
		olmObj.currentMapType = "ROADMAP";         
		olmObj.map.getLayers().insertAt(0, olmObj._baseLayer);
        window.addEventListener('resize', function(evt) {   
            olmObj.refreshMap();
        });	
	};
	
	OSMImpl.getMapAttributions = function(olmObj) {
		return olmObj.getMapAttributions(olmObj);
	};
	
	OSMImpl.updateMapType = function(mapType, olmObj) {
        
		if(mapType == 'HYBRID') {
            if(olmObj._satelliteSource === undefined) {
                olmObj._satelliteSource = OSMImpl.getSatelliteSource();
            }
            olmObj._baseLayer.setSource(olmObj._satelliteSource);
            if(olmObj._hybridLayer === undefined) {
                olmObj._hybridLayer = OSMImpl.getHybridLayer();
            }
            var _mapLayersColln = olmObj.map.getLayers();
            _mapLayersColln.insertAt(1, olmObj._hybridLayer);
            return;
        }

        if(olmObj._hybridLayer !== undefined) {
            olmObj.map.removeLayer(olmObj._hybridLayer);
        }

        if(mapType == 'SATELLITE') {
            if(olmObj._satelliteSource === undefined) {
                olmObj._satelliteSource = OSMImpl.getSatelliteSource();
            }
            olmObj._baseLayer.setSource(olmObj._satelliteSource);
            return;
        }
		
		if(mapType == 'ROADMAP') {
			olmObj._baseLayer.setSource(olmObj._baseSource);
		}        
	};
	
	OSMImpl.getSatelliteSource = function() {
		return new ol.source.MapQuest({
			layer : 'sat'
		});
	};
	
	OSMImpl.getHybridLayer = function() {
		return new ol.layer.Tile({
			source :  new ol.source.MapQuest({
				layer : 'hyb'
			})
		});	
	};
	
	return OSMImpl;
})();