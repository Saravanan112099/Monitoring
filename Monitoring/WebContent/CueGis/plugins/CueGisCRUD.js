/**
 * Load the fence from GIS Engine
 * config - (JSON OBJECT) {
 *      fenceName - (STRING) Name of the fence (Which will be used to load from GIS Engine),
 *      fenceId - (STRING) Unique ID for the fence,
 *      fenceOptions - (JSON OBJECT) Fence UI Options,
 *      toolTip - (STRING) Text to be displayed on mouse hover over that element
 *      pan : (BOOLEAN) true to pan to that center of the fence
 * }
 * palletObject - (CuecentGISPallet) CuecentGISPallet Object
 */
FencingElement.prototype.loadFenceFromGiSEngine = function(config, palletObject) {  
    if(config === undefined || config === null) {
        throw "config parameter not found";
    }

    if(palletObject == undefined || palletObject === null) {
        throw "palletObject parameter not found";
    }

    var paramString = "fenceName="+config.fenceName;
    paramString = paramString+"&tenantID="+CueGis.tenantID;
    var implObject = palletObject.getImplObject();
    var fencingElement = this;
    new AjaxRequest().getRequest(CueGis.gisEngineUrl + CueGis.GisApi.Fence.get,paramString, 
            function() {
        if (this.readyState==4) {                               
            try {
                var jd = JSON.parse(this.responseText);
                var data = JSON.parse(jd.geoJson);                  
                fencingElement.load({
                    geoJson : data,
                    type : jd.fenceType,
                    config : config,
                    cuecentGISPallet : palletObject
                });
            } catch(e) {
                console.error(e);
            }                   
        }
    },  "text/plain");
};


/**
 * Save the Fence in GIS Engine
 * @param saveFenceConfig - (JSON OBJECT) {
 *  fence - (OBJECT) fence object
 *  palletObject - (CuecentGISPallet) CuecentGISPallet object
 *  fenceName - (STRING) Name of the fence,
 * }
 * @param callBack - (FUNCTION) To be invoked after fence loaded successfully
 */
FencingElement.prototype.saveFenceInGisEngine = function(saveFenceConfig, callBack) {

    var geoJson = this.exportGeoJsonObject(saveFenceConfig.fence, saveFenceConfig.palletObject);
    var fenceName = saveFenceConfig.fenceName;

    var params = {};
    params.name=fenceName;
    params.fenceType = saveFenceConfig.fence.fenceType;
    params.fenceCategory = {
            category :  saveFenceConfig.category
    };
    params.forceFenceCategoryCreation = true;
    params.geoJson = geoJson;
    params.tenantID = CueGis.tenantID;
    new AjaxRequest().postRequest(CueGis.gisEngineUrl+CueGis.GisApi.Fence.save,JSON.stringify(params),function() {
        if(this.readyState == 4 && this.status == 201) {
            callBack.call(null, this.responseText);
        }
    }, "application/json");

};




/**
 * Save the POI in CueGis Engine
 * @param poiConfig - (JSON OBJECT) {
 *      categoryName : (STRING) Category name under which this POI is going to be saved
 *      tagName : (STRING) POI Name 
 *      latLng- (OBJECT)
 *  }
 * @param callBack - Function to be invoked after saving
 */
PoiElement.prototype.savePOI = function(poiConfig, callBack) {

    if(!poiConfig) {
        throw "poiConfig object cannot be null or undefined";
    }

    if(!poiConfig.latLng) {
        throw "LatLng is missing";      
    }

    if(!poiConfig.categoryName) {
        throw "Category Name is missing";
    }

    if(!poiConfig.tagName) {
        throw "Tag Name is missing";
    }

    var ajaxReq = new AjaxRequest();
    var paramString = "latitude="+poiConfig.latLng.lat+"&longitude="+poiConfig.latLng.lng+"&categoryName="+poiConfig.categoryName+"&tagName="+poiConfig.tagName+"&forcePOICategoryCreation="+true;
    paramString = paramString+"&tenantID="+CueGis.tenantID;
    ajaxReq.postRequest(CueGis.gisEngineUrl+CueGis.GisApi.POI.save, paramString, function() {
        if (this.readyState==4) {               
            callBack.call(null, this.responseText);
        }
    },  "application/x-www-form-urlencoded");
};


/**
 * Load the POI from GIS Engine
 * @param poiConfig (JSON OBJECT) {
 *      poiName - (STRING) Name of the POI
 *      markerOptions- (JSON OBJECT)
 *      toolTip - (STRING) Tool Tip to be displayed on HOVER for this POI
 *      pan - (BOOLEAN) to pan to the location after loading
 *  }
 * @param palletObject - CuecentGISPallet object
 */
PoiElement.prototype.loadPOIFromGisEngine = function(poiConfig, palletObject) {
    if(!poiConfig) {
        throw "poiConfig object cannot be null or undefined";
    }
    var ajaxReq = new AjaxRequest();
    var that = this;
    var paramString = "poiTagName="+poiConfig.poiName;
    paramString = paramString+"&tenantID="+CueGis.tenantID;
    ajaxReq.getRequest(CueGis.gisEngineUrl+CueGis.GisApi.POI.get, paramString, function() {
        if (this.readyState==4) {               
            var poiData = JSON.parse(this.responseText);

            for(var i=0;i<poiData.length; i++) {
                var poi = poiData[i];
                that.loadPOI({
                    latitude : poi.latLng.latitude,
                    longitude : poi.latLng.longitude,
                    markerOptions : poiConfig.markerOptions || that.markerOptions,              
                    pId : poi.id,
                    toolTip : poi.tag,
                    pan : poiConfig.pan
                }, palletObject);
            }

            if(poiConfig.callBack) {
                poiConfig.callBack.call(this);
            }

        }
    },  "text/plain");  

};

/**
 * @param poiConfig (JSON OBJECT) {
 *  categoryName - (STRING) Category Name for the POI
 *  markerOptions- (JSON OBJECT)
 *  toolTip - (STRING) Tool Tip to be displayed on HOVER for this POI
 *  pan - (BOOLEAN) to pan to the location after loading,
 *  callBack - (FUNCTION) to be called after loading POI under a category
 *  }
 * @param palletObject
 */
PoiElement.prototype.loadPOIUnderCategoryFromGisEngine = function(poiConfig, palletObject) {
    if(!poiConfig) {
        throw "poiConfig object cannot be null or undefined";
    }
    var ajaxReq = new AjaxRequest();
    var paramString = "poiCategoryName="+poiConfig.categoryName;
    paramString = paramString+"&tenantID="+CueGis.tenantID;
    var that = this;

    ajaxReq.getRequest(CueGis.gisEngineUrl+CueGis.GisApi.POI.getUnderCategory, paramString, function() {

        if (this.readyState==4) {
            var pois = JSON.parse(this.responseText);
            for(i=0; i<pois.length; i++) {
                var poi = pois[i];
                that.loadPOI({
                    latitude : poi.latLng.latitude, 
                    longitude : poi.latLng.longitude,
                    markerOptions : poiConfig.markerOptions,                
                    pId : poi.tag,
                    toolTip : poi.tag,
                    pan : poiConfig.pan         
                }, palletObject);
            }
            if(poiConfig.callBack) {
                poiConfig.callBack.call(this);
            }
        }
    },  "text/plain");  
};


/**
 * Load Event
 * @param config - {name - Name of the event to load , markerOptions - Same as POI Marker options }
 * @param palletObject
 */
TrackingElement.prototype.loadEvent = function(config, palletObject) {
    var implObject = palletObject.getImplObject();
    var me = this;
    var paramString = 'gisPID='+config.name;
    paramString = paramString+"&tenantID="+CueGis.tenantID;
    new AjaxRequest().getRequest(CueGis.gisEngineUrl +CueGis.GisApi.TrackingElement.get, 
            paramString,
            function() {
        if (this.readyState==4) {                               
            try {
                var latLngs = JSON.parse(this.responseText);                        
                me.createEvent({
                    markerOptions : config.markerOptions,
                    latitude :  latLngs.latLng.latitude,
                    longitude : latLngs.latLng.longitude,
                    eventId : config.name,
                    toolTip : 'This is'+config.name,
                    pan : true
                }, palletObject);
            } catch(e) {
                console.log(e);
            }

        }
    },  "text/plain");  
};

/**
 * Load Event with a route
 * @param config - {name - Name of the event to load , startDate - date (in the format YYYY-MM-DD HH:MM:SS) since event need to depicted in map, markerOptions - Same as POI Marker options }
 * @param palletObject
 */
TrackingElement.prototype.loadEventWithRoute = function(config, palletObject) {
    var implObject = palletObject.getImplObject();
    var me = this;

    var params = {};
    params.tenantID = CueGis.tenantID;
    params.PIDs =  [config.name];
    params.startDate = config.startDate;
	params.startIndex = 1;	
	params.endIndex = 1000;
    var data = JSON.stringify(params);
      
    new AjaxRequest().postRequest(CueGis.gisEngineUrl + CueGis.GisApi.TrackingElement.getWithRoute , 
            data,
            function() {
        if (this.readyState==4) {                               
            try {
                var jd = JSON.parse(this.responseText);
                
                if(jd.length == 0) {
                    return;
                }
                
                var lastIndex = jd.length-1;
                var trackingElement = me.createEvent({
                    markerOptions : config.markerOptions,
                    latitude :  jd[lastIndex].latLng.latitude,
                    longitude : jd[lastIndex].latLng.longitude,
                    eventId : config.name,
                    toolTip : 'This is'+jd[lastIndex].gisPID.PID,
                    pan : true
                }, palletObject);
				
				me.highlight(trackingElement, {
					animation : true,
					animationClass : 'circleOutRed'
				});
				
				var geoJson = {};
				geoJson.type = "LineString";
				geoJson.coordinates = [];
				for(var index=0; index<jd.length; index++) {
					var temp = [];
					var item = jd[index];					
					temp.push(item.latLng.longitude);
					temp.push(item.latLng.latitude);
					geoJson.coordinates.push(temp);
				}				
				me.loadRoute({
					geoJson : geoJson,
					trackingElement : trackingElement,
					routeOptions : {
						strokeColor : 'BLACK',
						strokeWidth : 5
					}
				});
            } catch(e) {
                console.log(e);
            }

        }
    },  "application/json");   
};


/**
 * Load the trackingElements in the given area
 * @param config - (JSON OBJECT) {
 *      areaType - (STRING) CIRCLE,
 *      circle- (JSON OBJECT) {
 *          latitude - (NUMBER)
 *          longitude - (NUMBER)
 *          radius - (NUMBER) Radius of the area in Meter
 *      },
 *      trackingElements : (JSON ARRAY) of trakingElements IDs which only need to be load on that area
 *      markerOptions - (JSON OBJECT) Same as POI Element Marker Options
 *      palletObject - (CuecentGISPallet) object
 * }
 * @param callBack - (FUNCTION) To be invoked after loading tracking Elements
 */
TrackingElement.prototype.loadTrackingElementInAreaFromGisEngine = function(config, callBack) {

    var that = this;
    var ajaxRequest = new AjaxRequest();    
    var obj = {};
    obj.geoJson = config.area;
    obj.tenantID = CueGis.tenantID;
    var data = JSON.stringify(obj);
    ajaxRequest.postRequest(CueGis.gisEngineUrl+CueGis.GisApi.TrackingElement.loadWithInArea, data, function(){
        if(this.readyState == 4 && this.status == 200) {            
            var data = JSON.parse(this.responseText);
            var elementsLoaded = [];
            for(var index=0; index<data.length; index++) {
                var trackingElement = data[index];
                var trackEle = {};
                trackEle.toolTip = trackingElement.PID;
                trackEle.pan = true;
                trackEle.eventId = trackingElement.id;
                trackEle.latitude = trackingElement.latLng.latitude;
                trackEle.longitude = trackingElement.latLng.longitude;
                trackEle.markerOptions = config.markerOptions;                                              
                that.loadTrackingElement(trackEle, config.palletObject)
                elementsLoaded.push(trackingElement);
            }
            callBack.call(null, elementsLoaded);
        }
    }, "application/json");

};