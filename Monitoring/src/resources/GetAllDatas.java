/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package resources;

import com.google.gson.JsonArray;
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import utils.CustomException;
import utils.RootCallableTask;
import utils.ServletCallableTask;

/**
 *
 * @author SP112099
 */
public class GetAllDatas {
    //TEMPLATE - EMPTY SYSTEM DETAILS 
    static String sysDetails = "[{\"name\":\"Disk %\",\"value\":\"0\",\"details\":{\"totalDiskSpace\":\"0G\",\"availableDiskSpace\":\"0G\",\"usedDiskSpace\":\"0G\"}},{\"name\":\"Mem %\",\"value\":\"0\",\"details\":{\"totalMemory\":\"0 Mb\",\"usedMemory\":\"0 Mb\",\"cacheMemory\":\"0 Mb\",\"bufferMemory\":\"0 Mb\"}},{\"name\":\"Cpu %\",\"value\":\"0\"}]";
//     String tmp = "[{\"name\" : \"Disk %\",\"value\" : \"33\",\"details\" : { \"totalDiskSpace\" : \"1.1T\",\"availableDiskSpace\" : \"702G\",\"usedDiskSpace\" : \"341G\" }},{\"name\" : \"Mem %\",\"value\" : \"98.2016\", \"details\" : { \"totalMemory\" : \"64244 Mb\", \"usedMemory\" : \"63089 Mb\",\"cacheMemory\" : \"54404 Mb\",\"bufferMemory\" : \"317 Mb\" }},{\"name\" : \"Cpu %\",\"value\" : \"1.2\"}]";
    
    public JsonObject finalOutput() throws IOException, CustomException{
        
        //JSON ARRAY FOR STORE ALL CALLABLE TASK RESULTS ( IT IS LIKE A RAW DATAS OF ALL THE SERVERS )
        JsonArray rawData = new JsonArray();
        rawData = new Tasks().getOmanUaeAndKsaResults();
//        String s = "[{\"omanData\":{\"sysDetails\":null,\"tenantDetails\":[{\"tenantName\":\"dominos\",\"totalVehicles\":25,\"moving\":9,\"notMoving\":15,\"nonReporting2\":1,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":1,\"lastFeedTime\":\"1492583317000\",\"reportExecutioStatus\":true},{\"tenantName\":\"techmart\",\"totalVehicles\":5,\"moving\":4,\"notMoving\":1,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":0,\"lastFeedTime\":\"1492583308000\",\"reportExecutioStatus\":true},{\"tenantName\":\"vlc\",\"totalVehicles\":602,\"moving\":120,\"notMoving\":430,\"nonReporting2\":14,\"nonReporting4\":0,\"nonReporting6\":3,\"nonReporting24\":52,\"lastFeedTime\":\"1832645709000\",\"reportExecutioStatus\":true},{\"tenantName\":\"national\",\"totalVehicles\":100,\"moving\":50,\"notMoving\":45,\"nonReporting2\":1,\"nonReporting4\":0,\"nonReporting6\":2,\"nonReporting24\":5,\"lastFeedTime\":\"1492583317000\",\"reportExecutioStatus\":true},{\"tenantName\":\"globalcarrental\",\"totalVehicles\":54,\"moving\":16,\"notMoving\":18,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":20,\"lastFeedTime\":\"1492583288000\",\"reportExecutioStatus\":true},{\"tenantName\":\"alghantoot\",\"totalVehicles\":34,\"moving\":18,\"notMoving\":13,\"nonReporting2\":2,\"nonReporting4\":0,\"nonReporting6\":2,\"nonReporting24\":3,\"lastFeedTime\":\"1492583319000\",\"reportExecutioStatus\":true},{\"tenantName\":\"asaasom\",\"totalVehicles\":0,\"moving\":0,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":null,\"reportExecutioStatus\":false},{\"tenantName\":\"bcc_om\",\"totalVehicles\":53,\"moving\":19,\"notMoving\":28,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":6,\"lastFeedTime\":\"1492583248000\",\"reportExecutioStatus\":true},{\"tenantName\":\"marsllc\",\"totalVehicles\":42,\"moving\":17,\"notMoving\":23,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":2,\"lastFeedTime\":\"1492583302000\",\"reportExecutioStatus\":true},{\"tenantName\":\"krshipping\",\"totalVehicles\":33,\"moving\":15,\"notMoving\":13,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":5,\"lastFeedTime\":\"1492583306000\",\"reportExecutioStatus\":true},{\"tenantName\":\"prestige\",\"totalVehicles\":7,\"moving\":3,\"notMoving\":3,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":1,\"lastFeedTime\":\"1492583271000\",\"reportExecutioStatus\":true},{\"tenantName\":\"omanair\",\"totalVehicles\":23,\"moving\":3,\"notMoving\":20,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":\"1492583231000\",\"reportExecutioStatus\":true},{\"tenantName\":\"xpress\",\"totalVehicles\":65,\"moving\":11,\"notMoving\":50,\"nonReporting2\":3,\"nonReporting4\":0,\"nonReporting6\":5,\"nonReporting24\":4,\"lastFeedTime\":\"1492583319000\",\"reportExecutioStatus\":true},{\"tenantName\":\"eurocarrental\",\"totalVehicles\":211,\"moving\":41,\"notMoving\":148,\"nonReporting2\":12,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":22,\"lastFeedTime\":\"1492583319000\",\"reportExecutioStatus\":true},{\"tenantName\":\"omzest\",\"totalVehicles\":4,\"moving\":1,\"notMoving\":3,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":\"1492583194000\",\"reportExecutioStatus\":true},{\"tenantName\":\"infiniti\",\"totalVehicles\":0,\"moving\":0,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":\"1492583216000\",\"reportExecutioStatus\":true},{\"tenantName\":\"mhdgases\",\"totalVehicles\":63,\"moving\":25,\"notMoving\":32,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":6,\"lastFeedTime\":\"1492583296000\",\"reportExecutioStatus\":true},{\"tenantName\":\"intaj\",\"totalVehicles\":13,\"moving\":0,\"notMoving\":12,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":1,\"lastFeedTime\":\"1492582976000\",\"reportExecutioStatus\":true},{\"tenantName\":\"bec\",\"totalVehicles\":64,\"moving\":18,\"notMoving\":44,\"nonReporting2\":1,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":2,\"lastFeedTime\":\"1492583308000\",\"reportExecutioStatus\":true},{\"tenantName\":\"epc\",\"totalVehicles\":6,\"moving\":0,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":6,\"lastFeedTime\":\"1489414642000\",\"reportExecutioStatus\":true},{\"tenantName\":\"budgetcar\",\"totalVehicles\":1040,\"moving\":208,\"notMoving\":759,\"nonReporting2\":56,\"nonReporting4\":0,\"nonReporting6\":14,\"nonReporting24\":73,\"lastFeedTime\":\"1924351562000\",\"reportExecutioStatus\":true},{\"tenantName\":\"abclog\",\"totalVehicles\":25,\"moving\":21,\"notMoving\":3,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":1,\"lastFeedTime\":\"1492583314000\",\"reportExecutioStatus\":true},{\"tenantName\":\"gulftaleed\",\"totalVehicles\":183,\"moving\":35,\"notMoving\":121,\"nonReporting2\":12,\"nonReporting4\":7,\"nonReporting6\":34,\"nonReporting24\":27,\"lastFeedTime\":\"1492583316000\",\"reportExecutioStatus\":true},{\"tenantName\":\"rmab\",\"totalVehicles\":12,\"moving\":8,\"notMoving\":3,\"nonReporting2\":2,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":1,\"lastFeedTime\":\"1492583318000\",\"reportExecutioStatus\":true},{\"tenantName\":\"bct\",\"totalVehicles\":2,\"moving\":1,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":1,\"lastFeedTime\":\"1492583195000\",\"reportExecutioStatus\":true},{\"tenantName\":\"bec\",\"totalVehicles\":1,\"moving\":1,\"notMoving\":0,\"nonReporting2\":1,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":0,\"lastFeedTime\":\"1492583308000\",\"reportExecutioStatus\":true},{\"tenantName\":\"firstfocus\",\"totalVehicles\":10,\"moving\":2,\"notMoving\":8,\"nonReporting2\":1,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":0,\"lastFeedTime\":\"1492583065000\",\"reportExecutioStatus\":true},{\"tenantName\":\"globalquick\",\"totalVehicles\":16,\"moving\":15,\"notMoving\":1,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":0,\"lastFeedTime\":\"1492583312000\",\"reportExecutioStatus\":true},{\"tenantName\":\"ivmsprod\",\"totalVehicles\":0,\"moving\":0,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":null,\"reportExecutioStatus\":true},{\"tenantName\":\"smcinfra\",\"totalVehicles\":56,\"moving\":32,\"notMoving\":23,\"nonReporting2\":3,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":1,\"lastFeedTime\":\"1492583295000\",\"reportExecutioStatus\":true},{\"tenantName\":\"aljabri\",\"totalVehicles\":46,\"moving\":21,\"notMoving\":15,\"nonReporting2\":2,\"nonReporting4\":1,\"nonReporting6\":5,\"nonReporting24\":10,\"lastFeedTime\":\"1492583318000\",\"reportExecutioStatus\":true},{\"tenantName\":\"omanautorent\",\"totalVehicles\":325,\"moving\":93,\"notMoving\":225,\"nonReporting2\":11,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":7,\"lastFeedTime\":\"1561517521000\",\"reportExecutioStatus\":true},{\"tenantName\":\"alnouj\",\"totalVehicles\":22,\"moving\":3,\"notMoving\":18,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":1,\"lastFeedTime\":\"1492583247000\",\"reportExecutioStatus\":true},{\"tenantName\":\"uaeautorent\",\"totalVehicles\":456,\"moving\":158,\"notMoving\":246,\"nonReporting2\":10,\"nonReporting4\":0,\"nonReporting6\":18,\"nonReporting24\":52,\"lastFeedTime\":\"1492583313000\",\"reportExecutioStatus\":true},{\"tenantName\":\"avis\",\"totalVehicles\":69,\"moving\":21,\"notMoving\":47,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":1,\"lastFeedTime\":\"1492583288000\",\"reportExecutioStatus\":true},{\"tenantName\":\"ztsb\",\"totalVehicles\":7,\"moving\":2,\"notMoving\":5,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":\"1492583055000\",\"reportExecutioStatus\":true},{\"tenantName\":\"beacon\",\"totalVehicles\":12,\"moving\":7,\"notMoving\":4,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":1,\"lastFeedTime\":\"1492583277000\",\"reportExecutioStatus\":true},{\"tenantName\":\"sba\",\"totalVehicles\":1,\"moving\":1,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":\"1492583106000\",\"reportExecutioStatus\":true},{\"tenantName\":\"barikgroup\",\"totalVehicles\":0,\"moving\":0,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":null,\"reportExecutioStatus\":true},{\"tenantName\":\"marhaba\",\"totalVehicles\":60,\"moving\":12,\"notMoving\":48,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":1,\"nonReporting24\":0,\"lastFeedTime\":\"1492583310000\",\"reportExecutioStatus\":true},{\"tenantName\":\"amlaklog\",\"totalVehicles\":0,\"moving\":0,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":null,\"reportExecutioStatus\":true},{\"tenantName\":\"khazain\",\"totalVehicles\":11,\"moving\":2,\"notMoving\":9,\"nonReporting2\":5,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":\"1492583249000\",\"reportExecutioStatus\":true},{\"tenantName\":\"maqshan\",\"totalVehicles\":0,\"moving\":0,\"notMoving\":0,\"nonReporting2\":0,\"nonReporting4\":0,\"nonReporting6\":0,\"nonReporting24\":0,\"lastFeedTime\":null,\"reportExecutioStatus\":true}]}},{\"otherData\":[{\"sysDetails\":[{\"name\":\"Disk %\",\"value\":\"9\",\"details\":{\"totalDiskSpace\":\"50G\",\"availableDiskSpace\":\"45G\",\"usedDiskSpace\":\"4.5G\"}},{\"name\":\"Mem %\",\"value\":\"37.8766\",\"details\":{\"totalMemory\":\"16050 Mb\",\"usedMemory\":\"6079 Mb\",\"cacheMemory\":\"3781 Mb\",\"bufferMemory\":\"164 Mb\"}},{\"name\":\"Cpu %\",\"value\":\"0.3\"}],\"tenantDetails\":[{\"tenantName\":\"ksa\",\"totalVehicles\":2043,\"moving\":396,\"notMoving\":1584,\"nonReporting2\":89,\"nonReporting4\":11,\"nonReporting6\":91,\"nonReporting24\":63,\"lastFeedTime\":\"1546571311000\",\"reportExecutioStatus\":true}],\"success\":true}]}]";
//        rawData = (new JsonParser()).parse(s).getAsJsonArray();
        System.out.println("rawData : "+rawData);
        //JSON OBJECT FOR STORE FINAL PROCCESED DATAS [FINAL OBJECT]
        JsonObject json_final = new JsonObject();
        
        //JSON OBJECTS FOR STORE SERVER WIZE DATAS
        JsonObject json_result_oman = new JsonObject();
        JsonObject json_result_uae = new JsonObject();
        /********COMMENTED ON 21-02-2017********/
        JsonObject json_result_ksa = new JsonObject();
        
        //EXTRACT OMAN DETAILS FROM RAW DATA [OMAN OBJECT]
        try{
            json_result_oman = (JsonObject) rawData.get(0).getAsJsonObject().get("omanData");
//            System.out.println("json_result_oman : "+json_result_oman);
        }catch(Exception e) {
        	e.printStackTrace();
        }
        //EXTRACT UAE DETAILS FROM RAW DATA [UAE OBJECT]
//        try{
//            json_result_uae = (JsonObject) rawData.get(1).getAsJsonObject().get("otherData").getAsJsonArray().get(0);
//            System.out.println("json_result_uae : "+json_result_uae);
//        }catch(Exception e) {
//        	e.printStackTrace();
//        }
        /********COMMENTED ON 21-02-2017********/
        System.out.println("rawData Size : "+rawData.size());
        if(rawData.toString().contains("otherData")){
	        //EXTRACT KSA DETAILS FROM RAW DATA [KSA OBJECT]
	        try{
	            json_result_ksa = (JsonObject) rawData.get(1).getAsJsonObject().get("otherData").getAsJsonArray().get(0);
	            System.out.println("json_result_ksa : "+json_result_ksa);
	        }catch(Exception e) {
	        	e.printStackTrace();
	        }
        }
        
        //CREATE A JSON ARRAY FOR COMBINE ALL TENANT DETAILS INTO AN SINGLE ARRAY [TENANT OBJECT]
        JsonArray tenantDatas = new JsonArray();
        
        //CREATE TEMP JSON ARRAYS TO HOLD SERVER WIZE TENANT DETAILS
        /********COMMENTED ON 21-02-2017********/
//        JsonArray uae_tenantDetails = new JsonArray();
        JsonArray oman_tenantDetails = new JsonArray();
        /********COMMENTED ON 21-02-2017********/
        JsonArray ksa_tenantDetails = new JsonArray();
        
        /********COMMENTED ON 21-02-2017********/
        //STORING UAE TENANT DETAILS INTO THE TENANT OBJECT
//        try{
//            //EXTRACTING ALL UAE TENANT DETAILS FROM THE UAE OBJECT
//            uae_tenantDetails = json_result_uae.get("tenantDetails").getAsJsonArray();
//            for (int i = 0; i < uae_tenantDetails.size(); i++) {
//                //STORING ALL UAE TENANT DETAILS INTO THE TENANT OBJECT ONE BY ONE
//                tenantDatas.add(uae_tenantDetails.get(i));
//            }
//        }catch(NullPointerException e){
//            e.printStackTrace();
//        }
        
        //STORING OMAN TENANT DETAILS INTO THE TENANT OBJECT
        try{
            //EXTRACTING ALL OMAN TENANT DETAILS FROM THE UAE OBJECT
            oman_tenantDetails = json_result_oman.get("tenantDetails").getAsJsonArray();
            for (int i = 0; i < oman_tenantDetails.size(); i++) {
                //STORING ALL OMAN TENANT DETAILS INTO THE TENANT OBJECT ONE BY ONE
                tenantDatas.add(oman_tenantDetails.get(i));
            }
        }catch(NullPointerException e){
        	e.printStackTrace();
        }
        
        /********COMMENTED ON 21-02-2017********/
        if(rawData.toString().contains("otherData")){
	        //STORING KSA TENANT DETAILS INTO THE TENANT OBJECT
	        try{
	            //EXTRACTING ALL KSA TENANT DETAILS FROM THE UAE OBJECT
	            ksa_tenantDetails = json_result_ksa.get("tenantDetails").getAsJsonArray();
	            for (int i = 0; i < ksa_tenantDetails.size(); i++) {
	                //STORING ALL KSA TENANT DETAILS INTO THE TENANT OBJECT ONE BY ONE
	                tenantDatas.add(ksa_tenantDetails.get(i));
	            }
	        }catch(NullPointerException e){
	            e.printStackTrace();
	        }
        }
        //STORING UAE SYSTEM DETAILS INTO THE FINAL OBJECT IN THE NAME OF uaeSysDetails
//        try{
//            //EXTRACTING UAE SYSTEM DETAILS FROM THE [UAE OBJECT]
//            json_final.add("uaeSysDetails", json_result_uae.get("sysDetails"));
//        }catch(Exception e){
//            e.printStackTrace();
//        }
        
        //CHECK THE SYSTEM DETAILS IS PRESENT IN THE UAE OBJECT
        if(!json_result_uae.has("sysDetails")){
                //IF THE SYSTEM DETAILS IS NULL THEN ADD A EMPTY TEMPLATE OBJECT
                JsonArray jobj = (new JsonParser()).parse(sysDetails).getAsJsonArray();
                json_final.add("uaeSysDetails", jobj);
        //CHECK THE SYSTEM DETAILS IS NULL IN THE UAE OBJECT
        }else if(json_result_uae.get("sysDetails") instanceof JsonNull){
            //IF THE SYSTEM DETAILS IS NULL THEN ADD A EMPTY TEMPLATE OBJECT
            JsonArray jobj = (new JsonParser()).parse(sysDetails).getAsJsonArray();
            json_final.add("uaeSysDetails", jobj);
        }
        
        //STORING OMAN SYSTEM DETAILS INTO THE FINAL OBJECT IN THE NAME OF omanSysDetails
        try{
            //EXTRACTING OMAN SYSTEM DETAILS FROM THE [OMAN OBJECT]
            json_final.add("omanSysDetails", json_result_oman.get("sysDetails"));
        }catch(Exception e){
            e.printStackTrace();
        }
        //CHECK THE SYSTEM DETAILS IS PRESENT IN THE OMAN OBJECT
        if(!json_result_oman.has("sysDetails")){
                //IF THE SYSTEM DETAILS IS NULL THEN ADD A EMPTY TEMPLATE OBJECT
                JsonArray jobj = (new JsonParser()).parse(sysDetails).getAsJsonArray();
                json_final.add("omanSysDetails", jobj);
        //CHECK THE SYSTEM DETAILS IS NULL IN THE OMAN OBJECT
        }else if(json_result_oman.get("sysDetails") instanceof JsonNull){
            //IF THE SYSTEM DETAILS IS NULL THEN ADD A EMPTY TEMPLATE OBJECT
            JsonArray jobj = (new JsonParser()).parse(sysDetails).getAsJsonArray();
            json_final.add("omanSysDetails", jobj);
        }
        
        /********COMMENTED ON 21-02-2017********/
        //STORING KSA SYSTEM DETAILS INTO THE FINAL OBJECT IN THE NAME OF ksaSysDetails
        try{
            //EXTRACTING KSA SYSTEM DETAILS FROM THE [KSA OBJECT]
            json_final.add("ksaSysDetails", json_result_ksa.get("sysDetails"));
        }catch(Exception e){
            e.printStackTrace();
        }
        
        //CHECK THE SYSTEM DETAILS IS PRESENT IN THE KSA OBJECT
        if(!json_result_ksa.has("sysDetails")){
                //IF THE SYSTEM DETAILS IS NULL THEN ADD A EMPTY TEMPLATE OBJECT
                JsonArray jobj = (new JsonParser()).parse(sysDetails).getAsJsonArray();
                json_final.add("ksaSysDetails", jobj);
        //CHECK THE SYSTEM DETAILS IS NULL IN THE KSA OBJECT
        }else if(json_result_ksa.get("sysDetails") instanceof JsonNull){
            //IF THE SYSTEM DETAILS IS NULL THEN ADD A EMPTY TEMPLATE OBJECT
            JsonArray jobj = (new JsonParser()).parse(sysDetails).getAsJsonArray();
            json_final.add("ksaSysDetails", jobj);
        }
        
        json_final.add("tenantDetails", tenantDatas);
        return json_final;
    }
       
    public static void main(String args[]) throws IOException, CustomException{
//       GetAllDatas gad = new GetAllDatas();
//        System.out.println(gad.finalOutput());
//       GetOmanData god = new GetOmanData();
//        System.out.println(god.getOmanDetails());
//        System.out.println(new Tasks().getOmanUaeAndKsaResults());
    	
    }   
}
