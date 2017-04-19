/**
 * Here Maps Geocoder REST Service
 */
(function(){	
  
    var HereGeocoder = {};
    var aj = new AjaxRequest();
	
    HereGeocoder.init = function(config) {
        for(var key in config) {
            if(config.hasOwnProperty(key)) {
                HereGeocoder[key] = config[key];
            }
        }
		HereGeocoder.geoCodeUrl = HereGeocoder.url;		
		HereGeocoder.reverseGeoCodeUrl = HereGeocoder.reverseUrl;	
    };
   
    HereGeocoder.geoCode = function(address, callBack, limit, filters) {  
        
		var datas=[],response; 
		
		if(address === undefined) {
			throw "Address not specified";
		}
		HereGeocoder._getGeocodeRequestData(address, limit);
		
        aj.getRequest(HereGeocoder.geoCodeUrl, HereGeocoder.data, function(){		
            if(this.readyState == 4 && this.status == 200) {				
                var result = JSON.parse(this.responseText);	
				
				if(result.Response === undefined) {
					response = "NO DATA FOUND";	
				} else {
					var view = result.Response.View;				
					if(view.length > 0) {
						var results = view[0].Result;
						for(var index=0; index<results.length; index++) {
							var location = results[index].Location;
							var data = {};              
							data.name = location.Address.Label;
							data.lat = location.DisplayPosition.Latitude;
							data.lng = location.DisplayPosition.Longitude;
							data.type = location.LocationType;
							data._address = location.Address;
							data._boundary = location.MapView;
							
							if(filters!== undefined && filters.length>0) {
								if(filters.indexOf(location.LocationType) != -1) {
									datas.push(data);	
								}
							} else {
								datas.push(data);
							}
						}
						response = "OK";                    
					} else {
						response = "NO DATA FOUND";
					}		
				}				
                if(callBack !== undefined) {                   
                    callBack.call(null, datas, response);
                }
            }
        }, "text/plain");   
    };  

    HereGeocoder.bulkGeoCode = function(locations) {
        var updatedLocations = [];
        for(var i=0;i<locations.length;i++) {
            var location = locations[i];
			location = location.trim();			
            if(location) {				
				HereGeocoder._getGeocodeRequestData(location);
			    var request = new XMLHttpRequest();
                request.open('GET', HereGeocoder.url+"?"+HereGeocoder.data, false);  
                request.send(null);
                if (request.status === 200) {
					var resultData = JSON.parse(request.responseText);					
					var isFound  = false;					
					if(resultData.Response) {
						var view = resultData.Response.View;				
						if(view.length > 0) {
							var results = view[0].Result;
							for(var index=0; index<results.length; index++) {
								if(isFound) {
									continue;
								}
								var result = results[index];
								var resLocation = result.Location;
								var newLoc = "";
								newLoc = resLocation.DisplayPosition.Latitude + " " + resLocation.DisplayPosition.Longitude;
								updatedLocations.push(newLoc);							
								isFound = true;							
							}
						}
					} else {
						updatedLocations.push(locations[i]);
					}
                }
                continue;
            }
            updatedLocations.push(locations[i]);			
        }
		//console.log(updatedLocations);
        return updatedLocations;
    };

    HereGeocoder.reverseGeoCode = function(latLng, callBack) {
		var datas=[],response; 		
		HereGeocoder.data = "gen=9";
		HereGeocoder.data += ("&app_id="+HereGeocoder.appId);
		HereGeocoder.data += ("&app_code="+HereGeocoder.appCode);
		HereGeocoder.data += ("&mode=retrieveAll");
		HereGeocoder.data += ("&prox="+latLng.lat+","+latLng.lng);
		HereGeocoder.data += "&language=EN";
        aj.getRequest(HereGeocoder.reverseGeoCodeUrl, HereGeocoder.data, function(){
            if(this.readyState == 4 && this.status == 200) {			
                var result = JSON.parse(this.responseText);
				var response = {};				
				if(result.Response === undefined) {
					console.log(result);
					response.status = false;
					response.message = result.Details;
					return;
				} else {
					var view = result.Response.View;				
					if(view.length > 0) {
						var location = view[0].Result[0].Location;
						response.status = true;
						response.result = {
							lat : location.DisplayPosition.Latitude,
							lng : location.DisplayPosition.Longitude,
							name : location.Address.Label,
							address : location.Address
						};
					} else {
						response.status = false;
						response.message = "No data found";
					}				
				}				
                if(callBack !== undefined) {					
                    callBack.call(null, response);
                }
            }
        }, "text/plain");   
    };
    
	// Creates the query param for geocode request
	HereGeocoder._getGeocodeRequestData = function(address, limit) {
		HereGeocoder.data = "gen=9";
		HereGeocoder.data += ("&app_id="+HereGeocoder.appId);
		HereGeocoder.data += ("&app_code="+HereGeocoder.appCode);
		
		if(limit) {
			HereGeocoder.data += ("&maxresults="+limit);
		}
		HereGeocoder.data += "&language=EN";		
		HereGeocoder.data += ("&searchtext="+address);
	};
	
	return HereGeocoder;
})();