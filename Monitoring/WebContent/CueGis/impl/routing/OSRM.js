/**
* URL :	http://router.project-osrm.org/viaroute
			?loc=lat1,lon1&loc=lat2,loc2
*/
(function(){	
	var OSRM = {};
	var aj = new AjaxRequest();	
	OSRM.maxLimitForWayPoints = 50;
	OSRM.init = function(config) {
		for(var key in config) {
			if(config.hasOwnProperty(key)) {
				OSRM[key] = config[key];
			}
		}	
	};
	
	if(OSRM.url === undefined) {
		OSRM.url = "http://router.project-osrm.org/viaroute";
	}
	
	if(OSRM.matchUrl === undefined) {
		OSRM.matchUrl = "http://router.project-osrm.org/match";
	}
	
	OSRM.findRoute = function(findRouteOptions, callBack) {		
		var url, type;
		if(findRouteOptions.type && findRouteOptions.type == "formatRoute") {
			url = OSRM.matchUrl;
			type = 2;
		} else {
			url = OSRM.url;
			type = 1;
		}	
		//To Force using viaRoute API alone
		//url = OSRM.url;
		//type = 1;	
		
		var route = {};
		route.geoJson = {};
		route.geoJson.type = "LineString";
		route.geoJson.properties = {};
		route.geoJson.properties.source = findRouteOptions.source;
		route.geoJson.properties.destination = findRouteOptions.destination;
		route.geoJson.coordinates = [];
		var result = {};
		result.routes = [];
		result.status = true;
		result.routes.push(route);
		
		try {
			if(findRouteOptions.useLimited || findRouteOptions.wayPoints.length > OSRM.maxLimitForWayPoints) {
				console.log("Max Waypoints limit Exceeds, Using the iterative approach..");
				OSRM.limitedWayPointsMethod(findRouteOptions, url, type, route.geoJson.coordinates);			
			} else {			
				OSRM.unlimitedWayPointsMethod(findRouteOptions, url, type, route.geoJson.coordinates);
			}
		} catch(e) {
			if(e.message == "OSRM_FAIL") {
				result.status = false;
				result.routes = [];
			}
		}
		if(callBack !== undefined) {
			callBack.call(null, result);
		}
	};
	
	String.prototype.replaceAt = function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	};
	
	OSRM.unlimitedWayPointsMethod = function(findRouteOptions, url, type, coordinates) {
		var completeWaypoints = OSRM._getCompletePoints(findRouteOptions);
		var data = OSRM._getQueryParamFromWayPoints(completeWaypoints);			
		OSRM._processRequest(findRouteOptions, url, type, coordinates, data);	
	};
	
	OSRM._processRequest = function(findRouteOptions, url, type, coordinates, data) {
		
		var request = new XMLHttpRequest();
		request.open('GET', url+"?"+data, false);		
		request.onreadystatechange = function() {
			var isSuccess = true;
			if(request.readyState == 4) {
				if(request.status == 200) {
					var resultData = OSRM.processResponseData(findRouteOptions, 
					this.responseText);				 
					if((resultData.status && resultData.status == 200) || 
						(resultData.status_message && 
							(
								(resultData.status_message.indexOf("Found matchings") != -1) ||
								(resultData.status_message.indexOf("Found route between points")!=-1 )
							)
						)
					) {
						if(type == 1) {
							OSRM.parseResponseFromViaRouteAPI(resultData,coordinates);
						} else if(type == 2){					   
							OSRM.parseResponseFromMatchAPI(resultData, coordinates);
							if(coordinates.length === 0) {
								console.log("No data found with match API, So using the viaRoute (1) API");
								isSuccess = false;
							}
						}										
					} else {
						if(resultData.status && (resultData.status == 207 || resultData.status == 208)) {
							isSuccess = false;
						}					
						if(resultData.status_message && 
							((resultData.status_message.indexOf("Cannot find matchings") != -1) ||
									(resultData.status_message.indexOf("No suitable matching candidates found") != -1))) {
							isSuccess = false;
						}					
					}					
				} else {
					if(type == 2) {
						console.log("HTTP Problem with match API, So using the viaRoute API");
						isSuccess = false;
					}
					console.log(":: HTTP Request Failed::");
					console.log(this);
				}
				if(!isSuccess) {
					OSRM._processRequest(findRouteOptions, OSRM.url, 1, coordinates, data);
				}
			}		
		};
		request.send(null);		
	};
	
	OSRM.limitedWayPointsMethod = function(findRouteOptions, url, type, coordinates) {
		
		var wayPoints = OSRM._getCompletePoints(findRouteOptions);
		var splittedWayPoints = OSRM._getSplits(wayPoints);		
		
		for(var splitIndex=0; splitIndex<splittedWayPoints.length; splitIndex++) {
			var currentSplit = splittedWayPoints[splitIndex];
			var data = OSRM._getQueryParamFromWayPoints(currentSplit);
			OSRM._processRequest(findRouteOptions, url, type, coordinates, data);
		}
	};
	
	// Forms the query params for the given waypoints
	OSRM._getQueryParamFromWayPoints = function(wayPoints) {
		var data = [];	
		var ways = wayPoints;		
		for(var index=0; index<ways.length;index++) {
			var way = ways[index];
			if(way === undefined) {continue;}
			var location = way.location.split(" ");
			data.push("&loc=");
			data.push(location[0]);
			data.push(",");
			data.push(location[1]);				
		}
		return data.join("");
	};
	
	// Parse the encoded route data
	OSRM._decodeData = function(encoded) {
		var precision = 6;
		var len = encoded.length,
		index=0,
		lat=0,
		lng = 0,
		array = [];
		precision = Math.pow(10, -precision);
		
		while (index < len) {
			var b,
			shift = 0,
			result = 0;
			do {
				b = encoded.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
			lat += dlat;
			shift = 0;
			result = 0;
			do {
				b = encoded.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
			lng += dlng;		
			array.push( [lat * precision, lng * precision] );
			}
		return array;
	};
	
	// To get the complete waypoints (merging src and destination into waypoints)
	OSRM._getCompletePoints = function(findRouteOptions) {		
		var completePoints = findRouteOptions.wayPoints.slice(0);
		var srcLatLngs = findRouteOptions.source.split(" ");
		var src = {
			location : ""
		};
		src.location += srcLatLngs[0];
		src.location += " ";
		src.location += srcLatLngs[1];
		completePoints.unshift(src);
		
		var dstLatLngs = findRouteOptions.destination.split(" ");
		var dst = {
			location : ""
		};
		dst.location += dstLatLngs[0];
		dst.location += " ";
		dst.location += dstLatLngs[1];
		completePoints.push(dst);		
		return completePoints;
	};
	
	// Split the complete waypoints into array of maximum allowed waypoint for a request
	OSRM._getSplits = function(wayPoints) {	
		var maxLimit = OSRM.maxLimitForWayPoints;
		var datas = [];
		var data = [];
		for(i=0; i<wayPoints.length; i++) {
			if((i%(maxLimit)) === 0) {
				datas.push(data);
				data = [];				
				data.push(wayPoints[i-1]); // using last item as source of the next iteration to enable continuous path
			}
			data.push(wayPoints[i]); 			
		}		
		datas.shift();	
		return datas;
	};
	
	// For parsing response from match API
	OSRM.parseResponseFromMatchAPI = function(resultData, coordinates) {
		var matchings = resultData.matchings;		
		if(matchings === undefined) {
			throw "OSRM_FAIL";
		} else {
			for(var i=0; i<matchings.length;i++) {
				var matching = matchings[i];
				var dataPoints = OSRM._decodeData(matching.geometry);
				for(var index=0; index<dataPoints.length; index++) {
					var dataPoint = dataPoints[index];
					var temp = [];						
					temp.push(dataPoint[1]);
					temp.push(dataPoint[0]);
					coordinates.push(temp);
				}
			}		
		}		
	};
	
	// For parsing response from  viaRoute API
	OSRM.parseResponseFromViaRouteAPI = function(resultData, coordinates) {		
		if(resultData.route_geometry) {
			var dataPoints = OSRM._decodeData(resultData.route_geometry);		
			for(var index=0; index<dataPoints.length; index++) {
				var dataPoint = dataPoints[index];
				var temp = [];						
				temp.push(dataPoint[1]);
				temp.push(dataPoint[0]);
				coordinates.push(temp);
			}
		} else {
			throw "OSRM_FAIL";
		}	
	};
		

	// Parsing done to remove symbols in ORSM output
	OSRM.processResponseData = function(findRouteOptions, responseText) {		
		var resultData = [];
		try {
			resultData = JSON.parse(responseText);
		} catch(e) {			
			out=responseText;			
			if(out.contains('"matchings":[{"matched_names":[')) {
				var tmp="";
				var len = findRouteOptions.wayPoints.length+2;
				for(var i=0;i<len; i++) {						
					if(i==len-1) {
						tmp += '" "';
					} else {
						tmp += '" ",';
					}
				}		
				start=out.indexOf('"matchings":[{"matched_names":[');             
				out=out.replaceAt(start,'"matchings":[{"matched_names":['+tmp+']');
			}
				
			try {
				resultData = JSON.parse(out);
			} catch(err) {
				if(out.contains('"end_point"')) {
					start1 = 0;
					start1=out.indexOf('"end_point":');             
					out=out.replaceAt(start1,'"end_point":" ",');				
				}			
				if(out.contains('"start_point"')) {
					start2 = 0;
					start2=out.indexOf('"start_point":');             
					out=out.replaceAt(start2,'"start_point":" ",');  							
				}
			}
			resultData = JSON.parse(out);
		}
	  return resultData;
	};
	
	return OSRM;
})();