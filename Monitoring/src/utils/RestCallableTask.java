package utils;

import java.util.ArrayList;
import java.util.concurrent.Callable;


import com.bct.bpms.client.rest.RestClientApi;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class RestCallableTask implements Callable<JsonObject> {
	
	private String userId ;
	private String userName ;
	private String tenantId ;
	private String tenantName;
	
	static String port = Utils.getPropertyValues("port");
	static String ipAddress = Utils.getPropertyValues("ip");
	static String restUrl = "http://" + ipAddress + ":" + port + "/bpms/rest/CueRest/invokeService/";
	RestClientApi restClientApi = new RestClientApi(restUrl);
	
	
	JsonArray constData = new JsonArray();
	
	public RestCallableTask(String userId,String userName,String tenantId,String tenantName){
//		this.s= a;
		this.userId = userId;
		this.userName = userName;
		this.tenantId = tenantId;
		this.tenantName = tenantName;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
//	public JsonObject temp(){
//		JsonObject details = new JsonObject();
//    	JsonObject tenantsData = new JsonObject();
//    	JsonObject a = new JsonObject();
//		a.addProperty("strUserId", Integer.parseInt(userId));
//		a.addProperty("roleId", 1);
//		a.addProperty("OuId", 1);
//		a.addProperty("strTenantId", Integer.parseInt(tenantId));
//		a.addProperty("strLoginTenantId", tenantName);
//		a.addProperty("strUserName", userName);
//		a.addProperty("strLoggedInUsrId", Integer.parseInt(userId));
//		String assetsStatus = restClientApi.executeService("cuecent_tenant", tenantName, "getAssetsStatusCard", a);
//		String reportExecutionStatus = restClientApi.executeService("cuecent_tenant", tenantName, "getReportExecutionStatus", a);
//		
//		JsonObject json_assetsStatus = (new JsonParser()).parse(assetsStatus).getAsJsonObject();
//		JsonObject json_reportExecutionStatus = (new JsonParser()).parse(reportExecutionStatus).getAsJsonObject();
//		
//		//GETTING Report Status JSON ARRAY FROM getReportExecutionStatus SERVICE
//        JsonArray exec_stat_array = json_reportExecutionStatus.getAsJsonArray("ReportStatusCache");
//        
//        //GETTING Last Feed JSON ARRAY FROM getReportExecutionStatus SERVICE
//        JsonArray last_feed_array = json_reportExecutionStatus.getAsJsonArray("LastFeedCache");
//        
//        JsonArray non_reporting_cache = json_reportExecutionStatus.getAsJsonArray("NonReportCache");
//        
//			if(json_assetsStatus.has("AssetStatusList")){
//				//CONFIGURE ALL DATAS INTO THEIR TENANT NAME
//				details.add(tenantName,json_assetsStatus);									
//				
//				//CREATE A J-ARRAY FOR COUNT THE NO.OF ASSET STATUS LIST
//				JsonArray jsonArray = new JsonArray();
//				jsonArray.addAll(details.getAsJsonObject(tenantName).getAsJsonArray("AssetStatusList"));
//				Gson googleJson = new Gson();
//	            ArrayList<?> jsonObjList = googleJson.fromJson(jsonArray, ArrayList.class);
//
//	            //ADD THE TENANT NAME IN THE J-OBJECT
//	            tenantsData.addProperty("tenantName", tenantName.replaceAll("_tenant", ""));
//	            
//	            int totalVehicles = 0;
//	        	int moving = 0;
//	        	int notMoving = 0;
//	        	int nonReporting2 = 0 ;
//	        	int nonReporting4 = 0 ;
//	        	int nonReporting6 = 0 ;
//	        	int nonReporting24 = 0;
//	        	boolean reportExecutionStat = false ;
//	        	String lastFeedTime = null ;
//	        	
//	            for(int j=0;j<jsonObjList.size();j++){
//	            	int count =Integer.parseInt( ((JsonObject)jsonArray.get(j)).get("COUNT").getAsString());
//	            	String status = ((JsonObject)jsonArray.get(j)).get("STATUS").getAsString();
//	            	
//	            	if(status.trim().equals("In Transit")){
//	            		moving = count;
//	            	}
//	            	else if(status.trim().equals("Parked")){
//	            		notMoving = count;
//	            	}
//	            	else if(status.trim().equals("Uncertain")){
//	            		nonReporting24 = count;
//	            	}
//	            	totalVehicles = moving + notMoving + nonReporting24;            	
//	            }
//	            
//	            if(non_reporting_cache.size() > 0) {
//                        int i = 0;
////                        for (int i = 0; i < non_reporting_cache.size(); i++) {
//                        if (((JsonObject) non_reporting_cache.get(0)).has("nonreporting_2")) {
//                            nonReporting2 = (((JsonObject) non_reporting_cache.get(0)).get("nonreporting_2").toString().equals("null")) ? 0 : ((JsonObject) non_reporting_cache.get(0)).get("nonreporting_2").getAsInt();
//                        }
//                        if (((JsonObject) non_reporting_cache.get(0)).has("nonreporting_4")) {
//                            nonReporting4 = (((JsonObject) non_reporting_cache.get(0)).get("nonreporting_4").toString().equals("null")) ? 0 : ((JsonObject) non_reporting_cache.get(0)).get("nonreporting_4").getAsInt();
//                        }
//                        if (((JsonObject) non_reporting_cache.get(0)).has("nonreporting_6")) {
//                            nonReporting6 = (((JsonObject) non_reporting_cache.get(0)).get("nonreporting_6").toString().equals("null")) ? 0 : ((JsonObject) non_reporting_cache.get(0)).get("nonreporting_6").getAsInt();
//                        }
////                        }
////                            nonReporting2 = (((JsonObject)non_reporting_cache.get(0)).get("nonreporting_2").toString().equals("null")) ? 0 : ((JsonObject)non_reporting_cache.get(0)).get("nonreporting_2").getAsInt();
//                    }
//	            if(exec_stat_array.size() > 0){
//	            	reportExecutionStat = ((JsonObject)exec_stat_array.get(0)).get("reportexecutionstatus").getAsBoolean() ;
//	            }		            
//	            if(last_feed_array.size() > 0){
//	            	lastFeedTime = Utils.ConvertToTime(((JsonObject)last_feed_array.get(0)).get("lastfeedtime").getAsBigInteger()) ;
//	            	lastFeedTime = ((JsonObject)last_feed_array.get(0)).get("lastfeedtime").getAsString() ;
//	            }
//	            
//	            //ADD THE OTHER DETAILS IN THE J-OBJECT
//	            tenantsData.addProperty("totalVehicles", totalVehicles);
//	        	tenantsData.addProperty("moving", moving);
//	        	tenantsData.addProperty("notMoving", notMoving);
//	        	tenantsData.addProperty("nonReporting2", nonReporting2);
//	        	tenantsData.addProperty("nonReporting4", nonReporting4);
//	        	tenantsData.addProperty("nonReporting6", nonReporting6);
//	        	tenantsData.addProperty("nonReporting24", nonReporting24);
//	        	tenantsData.addProperty("lastFeedTime", lastFeedTime);
//	        	tenantsData.addProperty("reportExecutioStatus", reportExecutionStat);
////	        	constData.add(tenantsData);	        	
//			}
//		
////        Thread.sleep(10);
//        return tenantsData ;
//    }

	
	@Override
	public JsonObject call() throws Exception {
		JsonObject details = new JsonObject();
		JsonObject tenantsData = new JsonObject();
    	JsonObject a = new JsonObject();
		a.addProperty("strUserId", Integer.parseInt(userId));
		a.addProperty("roleId", 1);
		a.addProperty("OuId", 1);
		a.addProperty("strTenantId", Integer.parseInt(tenantId));
		a.addProperty("strLoginTenantId", tenantName);
		a.addProperty("strUserName", userName);
		a.addProperty("strLoggedInUsrId", Integer.parseInt(userId));
		String assetsStatus = restClientApi.executeService("cuecent_tenant", tenantName, "getAssetsStatusCard", a);
		String reportExecutionStatus = restClientApi.executeService("cuecent_tenant", tenantName, "getReportExecutionStatus", a);
		
		JsonObject json_assetsStatus = (new JsonParser()).parse(assetsStatus).getAsJsonObject();
		JsonObject json_reportExecutionStatus = (new JsonParser()).parse(reportExecutionStatus).getAsJsonObject();
		
		//GETTING Report Status JSON ARRAY FROM getReportExecutionStatus SERVICE
        JsonArray exec_stat_array = json_reportExecutionStatus.getAsJsonArray("ReportStatusCache");
        
        //GETTING Last Feed JSON ARRAY FROM getReportExecutionStatus SERVICE
        JsonArray last_feed_array = json_reportExecutionStatus.getAsJsonArray("LastFeedCache");
        
        JsonArray non_reporting_cache = json_reportExecutionStatus.getAsJsonArray("NonReportCache");
        
			if(json_assetsStatus.has("AssetStatusList")){
				//CONFIGURE ALL DATAS INTO THEIR TENANT NAME
				details.add(tenantName,json_assetsStatus);									
				
				//CREATE A J-ARRAY FOR COUNT THE NO.OF ASSET STATUS LIST
				JsonArray jsonArray = new JsonArray();
				jsonArray.addAll(details.getAsJsonObject(tenantName).getAsJsonArray("AssetStatusList"));
				Gson googleJson = new Gson();
	            ArrayList<?> jsonObjList = googleJson.fromJson(jsonArray, ArrayList.class);

	            //ADD THE TENANT NAME IN THE J-OBJECT
	            tenantsData.addProperty("tenantName", tenantName.replaceAll("_tenant", ""));
	            
	            int totalVehicles = 0;
	        	int moving = 0;
	        	int notMoving = 0;
	        	int nonReporting2 = 0 ;
	        	int nonReporting4 = 0 ;
	        	int nonReporting6 = 0 ;
	        	int nonReporting24 = 0;
	        	boolean reportExecutionStat = false ;
	        	String lastFeedTime = null ;
	        	
	            for(int j=0;j<jsonObjList.size();j++){
	            	int count =Integer.parseInt( ((JsonObject)jsonArray.get(j)).get("COUNT").getAsString());
	            	String status = ((JsonObject)jsonArray.get(j)).get("STATUS").getAsString();
	            	
	            	if(status.trim().equals("In Transit")){
	            		moving = count;
	            	}
	            	else if(status.trim().equals("Parked")){
	            		notMoving = count;
	            	}
	            	else if(status.trim().equals("Uncertain")){
	            		nonReporting24 = count;
	            	}
	            	totalVehicles = moving + notMoving + nonReporting24;            	
	            }
	            
	            if(non_reporting_cache.size() > 0) {
                        int i = 0;
//                        for (int i = 0; i < non_reporting_cache.size(); i++) {
                        if (((JsonObject) non_reporting_cache.get(0)).has("nonreporting_2")) {
                            nonReporting2 = (((JsonObject) non_reporting_cache.get(0)).get("nonreporting_2").toString().equals("null")) ? 0 : ((JsonObject) non_reporting_cache.get(0)).get("nonreporting_2").getAsInt();
                        }
                        if (((JsonObject) non_reporting_cache.get(0)).has("nonreporting_4")) {
                            nonReporting4 = (((JsonObject) non_reporting_cache.get(0)).get("nonreporting_4").toString().equals("null")) ? 0 : ((JsonObject) non_reporting_cache.get(0)).get("nonreporting_4").getAsInt();
                        }
                        if (((JsonObject) non_reporting_cache.get(0)).has("nonreporting_6")) {
                            nonReporting6 = (((JsonObject) non_reporting_cache.get(0)).get("nonreporting_6").toString().equals("null")) ? 0 : ((JsonObject) non_reporting_cache.get(0)).get("nonreporting_6").getAsInt();
                        }
//                        }
//                            nonReporting2 = (((JsonObject)non_reporting_cache.get(0)).get("nonreporting_2").toString().equals("null")) ? 0 : ((JsonObject)non_reporting_cache.get(0)).get("nonreporting_2").getAsInt();
                    }
	            if(exec_stat_array.size() > 0){
	            	reportExecutionStat = ((JsonObject)exec_stat_array.get(0)).get("reportexecutionstatus").getAsBoolean() ;
	            }		            
	            if(last_feed_array.size() > 0){
	            	lastFeedTime = Utils.ConvertToTime(((JsonObject)last_feed_array.get(0)).get("lastfeedtime").getAsBigInteger()) ;
	            	lastFeedTime = ((JsonObject)last_feed_array.get(0)).get("lastfeedtime").getAsString() ;
	            }
	            
	            //ADD THE OTHER DETAILS IN THE J-OBJECT
	            tenantsData.addProperty("totalVehicles", totalVehicles);
	        	tenantsData.addProperty("moving", moving);
	        	tenantsData.addProperty("notMoving", notMoving);
	        	tenantsData.addProperty("nonReporting2", nonReporting2);
	        	tenantsData.addProperty("nonReporting4", nonReporting4);
	        	tenantsData.addProperty("nonReporting6", nonReporting6);
	        	tenantsData.addProperty("nonReporting24", nonReporting24);
	        	tenantsData.addProperty("lastFeedTime", lastFeedTime);
	        	tenantsData.addProperty("reportExecutioStatus", reportExecutionStat);
//	        	constData.add(tenantsData);	        	
			}
		
//        Thread.sleep(10);
        return tenantsData ;
    }

}
