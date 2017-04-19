/**
 * Carto DB Implementation
 */
(function(){	
	
    var CartoDBImpl = {};
    var aj = new AjaxRequest();
	
    CartoDBImpl.init = function(osmObj) {      
	   CartoDBImpl.createMapLayer(osmObj);
    };
	
	CartoDBImpl.createMapLayer = function(olmObj) {
		olmObj._baseSource = new ol.source.XYZ({
			url : olmObj.mapSrc,
            attributions : CartoDBImpl.getMapAttributions(olmObj)
        });
        olmObj._hybridSource = undefined;
        olmObj._satelliteSource = undefined;
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
	
	CartoDBImpl.getMapAttributions = function(olmObj) {
		return [new ol.Attribution({
            html : 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.'
        })];
	};
	
	CartoDBImpl.updateMapType = function(mapType, olmObj) {
		// Layer update not applicable for CartoDB 
	};
	
	return CartoDBImpl;
})();