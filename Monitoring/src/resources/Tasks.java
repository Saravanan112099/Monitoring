/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package resources;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import utils.RestCallableTask;
import utils.RootCallableTask;
import utils.ServletCallableTask;
import utils.Utils;

/**
 *
 * @author SP112099
 */
public class Tasks {
	public static void main(String args[]) throws IOException{
//		Tasks t = new Tasks();
//		String url = "http://sa-autorent.cuetrans.com/Monitoring/report?username=ivms&password=ivms";
//    	System.out.println(t.getUaeAndKsaServletResults(url, null));
//    	
//    	long millis = System.currentTimeMillis();
//    	System.out.println(t.getOmanTenantDetails());
//    	long millis1 = System.currentTimeMillis();
//    	System.out.println("Executed : "+(millis1 - millis)/1000+" s");
		
//    	String[] userId = Utils.getPropertyValues("user_id").split(",");
//        String[] userName = Utils.getPropertyValues("user_name").split(",");
//        String[] tenantId = Utils.getPropertyValues("tenant_id").split(",");
//        String[] tenantName = Utils.getPropertyValues("tenant_name").split(",");
////        int i = 20;
//    	
//        for(int i = 0;i<1;i++){        
//        	if(i==20){
//        		continue;
//        	}
//        	RestCallableTask myCallable = new RestCallableTask(userId[i], userName[i], tenantId[i], tenantName[i]);
//        	System.out.println("i = "+i);
//        	long millis = System.currentTimeMillis();
//        	System.out.println(myCallable.temp());
//        	long millis1 = System.currentTimeMillis();
//            System.out.println("Time Taken : "+(millis1 - millis)/1000+" s");
//            if(i == userId.length -1){
//            	System.out.println("Finished");
//            }
//        }
//    	
    	
    	
    }
    
    
    public JsonArray getOmanTenantDetails() throws IOException {
        String[] userId = Utils.getPropertyValues("user_id").split(",");
        String[] userName = Utils.getPropertyValues("user_name").split(",");
        String[] tenantId = Utils.getPropertyValues("tenant_id").split(",");
        String[] tenantName = Utils.getPropertyValues("tenant_name").split(",");
        
        if (userId.length != userName.length
                || userId.length != tenantId.length
                || userId.length != tenantName.length) {
            Error error = new Error("Tenant Data Missmatch in config file");
            error.printStackTrace();
        }

//        ExecutorService executor = Executors.newFixedThreadPool(20);

        JsonArray finalresult = new JsonArray();

        List<RestCallableTask> futureList = new ArrayList<RestCallableTask>();
        for (int i = 0; i < userName.length; i++) {
//        	if(i == 20){
//        		continue;
//        	}
            RestCallableTask myCallable = new RestCallableTask(userId[i], userName[i], tenantId[i], tenantName[i]);
            futureList.add(myCallable);
        }
//        System.out.println(futureList.size());
//        ExecutorService executor = Executors.newSingleThreadExecutor();
        ExecutorService executor = null;

        try {
        	executor = Executors.newFixedThreadPool(futureList.size());
//            List<Future<JsonObject>> futures = executor.invokeAll(futureList);
            List<Future<JsonObject>> futures = executor.invokeAll(futureList);
            for (Future<JsonObject> future : futures) {
                try {
                    if (future.get().has("tenantName")) {
                        finalresult.add(future.get());
                    }
                } catch (CancellationException ce) {
                    ce.printStackTrace();
                } catch (ExecutionException ee) {
                    ee.printStackTrace();
                } catch (InterruptedException ie) {
                	ie.printStackTrace();
                    Thread.currentThread().interrupt(); // ignore/reset
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();
        }
        
        if (finalresult.isJsonNull()) {
            return null;
        } else {
            return finalresult;
        }
    }
    
    //CREATE TASK FOR CALLING UAE AND KSA SERVLETS
    public JsonArray getUaeAndKsaServletResults(String url_1){
        //JSON ARRAY FOR STORING BOTH UAE AND KSA SERVLER OUTPUTS
        JsonArray servletOutput = new JsonArray();
        
        //CREATE A LIST FOR ADDING THE TASKS 
        List<ServletCallableTask> futureList = new ArrayList<ServletCallableTask>();
        //CREATE THE INSTANCE FOR SERVLET CALLABLE TASK CLASS
        ServletCallableTask myCallable = new ServletCallableTask(url_1);
        /******Commented On 21-02-2017*****/
//         ServletCallableTask myCallable1 = new ServletCallableTask(url_2);
        //ADD THE TASKS IN THE LIST
        futureList.add(myCallable);
        /******Commented On 21-02-2017*****/
//         futureList.add(myCallable1);
        
      //CREATE AN EXECUTER SERVICE FOR CALLING 2 SERVLETS PARALLELLY
        ExecutorService executor = null;
         try {
        	 executor = Executors.newFixedThreadPool(1);
            //EXECUTE THE TASKS PARALLELLY
            List<Future<JsonObject>> futures = executor.invokeAll(futureList);
            for (Future<JsonObject> future : futures) {
                //STORE THE OUTPUT IN THE JSON ARRAY
                servletOutput.add(future.get());
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // STOP THE EXECUTER SERVICE
            executor.shutdown();
        }
        // RETURN THE EXECUTED TAKS OUTPUT [JSON ARRAY]
        return servletOutput;
    }
    
    
    public JsonArray getOmanUaeAndKsaResults(){
        JsonArray json = new JsonArray();
            
         List<RootCallableTask> futureList = new ArrayList<RootCallableTask>();
         RootCallableTask myCallable = new RootCallableTask("Get Oman Data");
         RootCallableTask myCallable1 = new RootCallableTask("Get Other Details");
         futureList.add(myCallable);
         futureList.add(myCallable1);
         ExecutorService executor = null;
         try {
        	executor = Executors.newFixedThreadPool(2);
            List<Future<JsonObject>> futures = executor.invokeAll(futureList);
            for (Future<JsonObject> future : futures) {
                json.add(future.get());
            }
//             System.out.println(json);
        } catch (Exception err) {
            err.printStackTrace();
        } finally {
             executor.shutdown();
         }
        
        return json;
        
    }
    
    
}
