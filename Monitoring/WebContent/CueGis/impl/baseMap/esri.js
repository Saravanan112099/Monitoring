/**
 * Carto DB Implementation
 */
(function(){	
	
    var EsriImpl = {};
    var aj = new AjaxRequest();
	
    EsriImpl.init = function(osmObj) {
	// topo, street, image, natgeo
	   EsriImpl.maps = {
			topo : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
			terrain : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
			street : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Street_Map/MapServer/tile/{z}/{y}/{x}',
			physical : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
			shaded : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
			image : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}',
			cloud : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'NASA_CloudCover_World/MapServer/tile/{z}/{y}/{x}',
			natgeo : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
			esri2d : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}',
			esriStreet2d : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'ESRI_StreetMap_World_2D/MapServer/tile/{z}/{y}/{x}',
			i3 : 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'I3_Imagery_Prime_World/MapServer/tile/{z}/{y}/{x}',
			oceanRef : 'http://server.arcgisonline.com/arcgis/rest/services/'+
			'Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
			lightGrey : 'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/'+'World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
			traffic : 'http://traffic.arcgis.com/arcgis/rest/services/'+'World/Traffic/MapServer/tile/{z}/{y}/{x}',
			darkGrey : 'http://server.arcgisonline.com/ArcGIS/rest/services/'+'Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
			worldReference : 'http://server.arcgisonline.com/ArcGIS/rest/services/Reference/'+'World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
			terrainElevation : 'http://elevation.arcgis.com/arcgis/rest/services/'+'WorldElevation/Terrain/ImageServer/tile/{z}/{y}/{x}',
			sat : 'http://landsat2.arcgis.com/arcgis/rest/services/'+'Landsat8_Panchromatic/ImageServer/tile/{z}/{y}/{x}'
	   };
	   
	   EsriImpl.createMapLayer(osmObj);
	   
    };
	
	EsriImpl.createMapLayer = function(olmObj) {
		olmObj._baseSource = new ol.source.XYZ({
			url : EsriImpl.maps.topo,
            attributions : EsriImpl.getMapAttributions(olmObj)
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
	
	EsriImpl.getMapAttributions = function(olmObj) {
		return [new ol.Attribution({
            html : 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
      'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
        })];
	};
	
	EsriImpl.updateMapType = function(mapType, olmObj) {
		// Layer update not applicable for CartoDB 
	};
	
	return EsriImpl;
})();