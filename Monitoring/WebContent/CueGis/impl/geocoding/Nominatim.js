/**
 * URL :	http://nominatim.openstreetmap.org/search/
 */
(function(){	
    var Nominatim = {};
    var aj = new AjaxRequest();
    var data = "format=json";

    Nominatim.init = function(config) {
        for(var key in config) {
            if(config.hasOwnProperty(key)) {
                Nominatim[key] = config[key];
            }
        }
        if(Nominatim.url === undefined) {
            Nominatim.url = "http://nominatim.openstreetmap.org/search/";
        }
        if(Nominatim.reverseGeocodeUrl === undefined) {
            Nominatim.reverseGeocodeUrl = "http://nominatim.openstreetmap.org/reverse";
        }		
    };

    Nominatim.geoCode = function(address, callBack, limit, filters) {  
        data = "format=json";

        /*if(limit != undefined) {
			data += "&limit="+limit;
		}*/		

        if(filters === undefined) {
            filters = [];
        }

        var filterLength = filters.length;
        aj.getRequest(Nominatim.url+address, data, function(){		
            if(this.readyState == 4 && this.status == 200) {				
                var results = JSON.parse(this.responseText);			
                var response = "OK";
                if(results.length === 0) {
                    response = "NO DATA FOUND";
                }
                if(callBack !== undefined) {
                    var datas = [];
                    for(var index=0; index<results.length; index++) {
                        var filterType = results[index]["class"];
                        if(filterLength === 0 || filters.indexOf(filterType) != -1) {
                            var data = {};              
                            data.name = results[index].display_name;
                            data.lat = Number(results[index].lat);
                            data.lng = Number(results[index].lon);
                            data.type = filterType;
                            datas.push(data);					
                        }				
                    }
                    if(limit !== undefined) {
                        limit = limit * 1;
                        if(limit > 0) {
                            datas = datas.slice(0, limit);
                        }
                    }
                    callBack.call(null, datas, response);
                }
            }
        }, "text/plain");   
    };
 
    Nominatim.bulkGeoCode = function(locations) {
        var updatedLocations = [];
        for(var i=0;i<locations.length;i++) {
            var locationLatLng = parseInt(locations[i]);
            if(isNaN(locationLatLng)) {
                var data = "format=json&q="+locations[i].trim();
                var request = new XMLHttpRequest();
                request.open('GET', Nominatim.url+"?"+data, false);  
                request.send(null);
                if (request.status === 200) {
                    var results = JSON.parse(request.responseText);					
                    var isFound = false;
                    for(var index=0; index<results.length; index++) {
                        if(isFound) {
                            continue;
                        }
                        if(results[index]["class"] == "place") {							            
                            var newLoc = "";
                            newLoc = Number(results[index].lat) + " " + Number(results[index].lon);						
                            updatedLocations.push(newLoc);							
                            isFound = true;
                        }
                    }
                }
                continue;
            }
            updatedLocations.push(locations[i]);			
        }
        return updatedLocations;
    };

    Nominatim.reverseGeoCode = function(latLng, callBack) {		

        var data = "format=json&lat="+latLng.lat+"&lon="+latLng.lng;	
   
		
        aj.getRequest(Nominatim.reverseGeocodeUrl, data, function(){		
            if(this.readyState == 4 && this.status == 200) {			
                var result = JSON.parse(this.responseText);			
                var response = {};
                if(result.error && result.error == "Unable to geocode") {
                    response.status = false;
                    response.message = result.error;
                } else {
                    response.status = true;
                    response.result = {
                            lat : result.lat,
                            lng : result.lon,
                            name : result.display_name,
                            address : result.address
                    };
                }
                if(callBack !== undefined) {					
                    callBack.call(null, response);
                }
            }
        }, "text/plain");   
    };
    return Nominatim;
})();