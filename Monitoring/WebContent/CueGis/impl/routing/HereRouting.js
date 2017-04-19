(function(){	
	
	var HereRouting = {};	
	
	HereRouting.init = function(config) {	
		for(var key in config) {
			if(config.hasOwnProperty(key)) {
				HereRouting[key] = config[key];
			}
		}	
		if(HereRouting.url === undefined) {
			HereRouting.url = "http://route.cit.api.here.com/routing/7.2/calculateroute.json";
		}
	};
	
	HereRouting.findRoute = function(findRouteOptions, callBack) {		
		
		var result = {
			status : false,
			routes : []
		};	
		
		if(findRouteOptions.source === undefined || 
			findRouteOptions.destination === undefined) {
			if(callBack) {
				result.errorMessage = "Source/Destination is Invalid";
				callBack.call(null, result);
			}
			return;
		}
		
		var url = HereRouting.url;
		url = url + ("?app_id="+HereRouting.appId+"&app_code="+HereRouting.appCode);
		url = url + "&mode=fastest;car&combineChange=true&routeattributes=li,gr&maneuverattributes=all&lineattributes=all";
		
		var data = HereRouting.getQueryData(findRouteOptions);		
				
		var request = new XMLHttpRequest();
		request.open('GET', url+data, false);  
		request.send(null);
			
		if(request.readyState == 4) {		
			
			if(request.status == 200) {
				var resultData = JSON.parse(request.responseText);
				var legs = resultData.response.route[0].leg;
				var route = {};
				route.geoJson = {};
				route.geoJson.type = "LineString";
				route.geoJson.properties = {};
				route.geoJson.properties.source = findRouteOptions.source;
				route.geoJson.properties.destination = findRouteOptions.destination;
				route.geoJson.coordinates = [];
			
				for(var lIndex=0;lIndex<legs.length; lIndex++) {
					var leg = legs[lIndex];
					var mans = leg.maneuver;
					for(var i=0;i<mans.length;i++) {
						var man = mans[i];
						var points = man.shape;
						for(var j=0;j<points.length; j++) {
							var point = points[j];
							var coords = point.split(",");					
							var temp = [];						
							temp.push(parseFloat(coords[1]));
							temp.push(parseFloat(coords[0]));
							route.geoJson.coordinates.push(temp);
						}			
					}
				}
				result.status = true;
				result.routes = [route];				
			} else if(request.status == 400) {
				var resData = JSON.parse(request.response);				
				result.status = false;
				result.errorMessage = resData.details;
				result.routes = [];
			}
		
			console.log(result);
			if(callBack) {						
				callBack.call(null, result);
			}
		}
	};	
	
	HereRouting.getQueryData = function(findRouteOptions) {
		var data = [];		
		var srcLatLngs = findRouteOptions.source.split(" ");
		data.push("&waypoint0=");
		data.push(srcLatLngs[0]);
		data.push(",");
		data.push(srcLatLngs[1]);				
		
		var ways = findRouteOptions.wayPoints;		
		for(var index=0,jIndex=1; index<ways.length;index++,jIndex++) {
			var way = ways[index];
			if(way === undefined) {continue;}
			var location = way.location.split(" ");
			data.push("&waypoint"+jIndex+"=");
			data.push(location[0]);
			data.push(",");
			data.push(location[1]);				
		}
		
		var dstLatLngs = findRouteOptions.destination.split(" ");
		data.push("&waypoint"+jIndex+"=");
		data.push(dstLatLngs[0]);
		data.push(",");
		data.push(dstLatLngs[1]);		
		return data.join("");
	};
			
	return HereRouting;
})();